export const PRIMARY_SPINNER = 'primary'

export type Size = 'default' | 'small' | 'medium' | 'large';

export class NgxSpinner {
  name: string;
  bdColor: string;
  size: Size;
  color: string;
  type: string;
  class: string;
  divCount: number;
  divArray: Array<number>;

  constructor(init?: Partial<NgxSpinner>) {
    Object.assign(this, init);
  }
}
