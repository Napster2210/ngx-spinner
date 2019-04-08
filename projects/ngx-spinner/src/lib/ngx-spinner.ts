export const PRIMARY_SPINNER = 'primary'

export type Size = 'default' | 'small' | 'medium' | 'large';

export interface Spinner {
  bdColor?: string;
  size?: Size;
  color?: string;
  type?: string;
  fullScreen?: boolean;
}

export class NgxSpinner {
  name: string;
  bdColor: string;
  size: Size;
  color: string;
  type: string;
  class: string;
  divCount: number;
  divArray: Array<number>;
  fullScreen: boolean;

  constructor(init?: Partial<NgxSpinner>) {
    Object.assign(this, init);
  }
}
