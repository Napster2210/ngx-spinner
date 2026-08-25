import { Rule } from '@angular-devkit/schematics';
import { setupProject } from './setup-project';

interface NgAddOptions {
  project?: string;
}

export default function (options: NgAddOptions): Rule {
  return setupProject(options);
}
