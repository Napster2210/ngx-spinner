import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Just return the tree
export default function (_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // const installTaskId = context.addTask(new NodePackageInstallTask());
    // context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
