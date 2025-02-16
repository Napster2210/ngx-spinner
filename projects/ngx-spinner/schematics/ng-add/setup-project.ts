import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import {
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
} from '@angular/cdk/schematics';

/** Name of the ngx-spinner module */
const spinnerModuleName = 'NgxSpinnerModule';

export default function (options: any): Rule {
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

function addSpinnerModule(options: any): Rule {
  return async (host: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (!hasNgModuleImport(host, appModulePath, spinnerModuleName)) {
      addModuleImportToRootModule(host, spinnerModuleName,
        'ngx-spinner', project);
    }

    return host;
  };
}