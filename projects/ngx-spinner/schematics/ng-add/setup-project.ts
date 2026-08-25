import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import {
  findBootstrapApplicationCall,
  getSourceFile,
  applyChangesToFile,
} from '@schematics/angular/utility/standalone/util';
import {
  addModuleImportToRootModule,
  getAppModulePath,
  getDecoratorMetadata,
  getMetadataField,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  insertImport,
  isStandaloneApp,
} from '@angular/cdk/schematics';
import * as ts from 'typescript';

/** Name of the ngx-spinner module */
const spinnerModuleName = 'NgxSpinnerModule';
/** Package from which the ngx-spinner module is imported */
const spinnerModuleImportPath = 'ngx-spinner';

interface NgAddOptions {
  project?: string;
}

export function setupProject(options: NgAddOptions): Rule {
  return async (host: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (project.extensions.projectType === 'application') {
      return chain([
        addSpinnerModule(options),
      ]);
    }
    return host;
  };
}

function addSpinnerModule(options: NgAddOptions): Rule {
  return async (host: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainPath = getProjectMainFile(project);

    if (isStandaloneApp(host, mainPath)) {
      addSpinnerModuleToStandaloneRoot(host, mainPath);
      return host;
    }

    const appModulePath = getAppModulePath(host, mainPath);
    if (!hasNgModuleImport(host, appModulePath, spinnerModuleName)) {
      addModuleImportToRootModule(host, spinnerModuleName,
        spinnerModuleImportPath, project);
    }

    return host;
  };
}

/**
 * Adds `NgxSpinnerModule` to the `imports` of the standalone component that
 * is bootstrapped via `bootstrapApplication()`, since standalone apps have
 * no `AppModule` to add it to.
 */
function addSpinnerModuleToStandaloneRoot(host: Tree, mainPath: string): void {
  const rootComponentPath = findRootStandaloneComponentPath(host, mainPath);

  if (!rootComponentPath || !host.exists(rootComponentPath)) {
    return;
  }

  const source = getSourceFile(host, rootComponentPath);
  const changes = addSymbolToComponentImports(
    source,
    rootComponentPath,
    spinnerModuleName,
    spinnerModuleImportPath,
  );

  applyChangesToFile(host, rootComponentPath, changes);
}

/**
 * Resolves the file path of the standalone component passed to
 * `bootstrapApplication()` in the project's main file.
 */
function findRootStandaloneComponentPath(host: Tree, mainPath: string): string | null {
  const bootstrapCall = findBootstrapApplicationCall(host, mainPath);
  const rootComponentArg = bootstrapCall.arguments[0];

  if (!rootComponentArg || !ts.isIdentifier(rootComponentArg)) {
    return null;
  }

  const mainSource = getSourceFile(host, mainPath);
  let modulePath: string | null = null;

  mainSource.forEachChild((node) => {
    if (
      modulePath === null &&
      ts.isImportDeclaration(node) &&
      node.importClause?.namedBindings &&
      ts.isNamedImports(node.importClause.namedBindings) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const hasRootComponentSpecifier = node.importClause.namedBindings.elements.some(
        (element) => (element.propertyName ?? element.name).text === rootComponentArg.text,
      );
      if (hasRootComponentSpecifier) {
        modulePath = node.moduleSpecifier.text;
      }
    }
  });

  if (!modulePath || !(modulePath as string).startsWith('.')) {
    return null;
  }

  const mainDir = mainPath.split('/').slice(0, -1).join('/');
  const resolvedPath = `${mainDir}/${modulePath}`.replace(/\/\.\//g, '/');

  for (const extension of ['.ts', '.tsx']) {
    const candidate = `${resolvedPath}${extension}`;
    if (host.exists(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Adds a symbol to the `imports` array of the first `@Component` decorator
 * found in the given source file, inserting the corresponding import
 * statement. Mirrors `addSymbolToNgModuleMetadata`, but targets `@Component`
 * metadata instead of `@NgModule` metadata, and is a no-op if the symbol is
 * already present.
 */
function addSymbolToComponentImports(
  source: ts.SourceFile,
  filePath: string,
  symbolName: string,
  importPath: string,
): Change[] {
  const metadataNodes = getDecoratorMetadata(source, 'Component', '@angular/core');
  const node = metadataNodes[0];

  if (!node || !ts.isObjectLiteralExpression(node)) {
    return [];
  }

  const matchingProperties = getMetadataField(node, 'imports');

  if (matchingProperties.length === 0) {
    let position: number;
    let toInsert: string;

    if (node.properties.length === 0) {
      position = node.getEnd() - 1;
      toInsert = `\n  imports: [\n    ${symbolName}\n  ]\n`;
    } else {
      const childNode = node.properties[node.properties.length - 1];
      position = childNode.getEnd();
      const text = childNode.getFullText(source);
      const matches = text.match(/^(\r?\n)(\s*)/);
      if (matches) {
        toInsert =
          `,${matches[0]}imports: [${matches[1]}` +
          `${' '.repeat(matches[2].length + 2)}${symbolName}${matches[0]}]`;
      } else {
        toInsert = `, imports: [${symbolName}]`;
      }
    }

    return [
      new InsertChange(filePath, position, toInsert),
      insertImport(source, filePath, symbolName, importPath),
    ];
  }

  const assignment = matchingProperties[0];

  if (
    !ts.isPropertyAssignment(assignment) ||
    !ts.isArrayLiteralExpression(assignment.initializer)
  ) {
    return [];
  }

  const arrayLiteral = assignment.initializer;
  const elements = arrayLiteral.elements;

  if (elements.some((element) => element.getText() === symbolName)) {
    return [];
  }

  const changes: Change[] = [insertImport(source, filePath, symbolName, importPath)];

  if (elements.length) {
    const lastElement = elements[elements.length - 1];
    changes.push(new InsertChange(filePath, lastElement.getEnd(), `, ${symbolName}`));
  } else {
    changes.push(new InsertChange(filePath, arrayLiteral.getEnd() - 1, symbolName));
  }

  return changes;
}
