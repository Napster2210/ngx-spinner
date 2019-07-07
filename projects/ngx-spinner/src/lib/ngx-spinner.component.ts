import {
  Component,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LOADERS, DEFAULTS, Size, NgxSpinner, PRIMARY_SPINNER } from './ngx-spinner.enum';

@Component({
  selector: 'ngx-spinner',
  templateUrl: 'ngx-spinner.component.html',
  styleUrls: ['ngx-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxSpinnerComponent implements OnDestroy, OnInit, OnChanges {

  /**
   * To set backdrop color
   * Only supports RGBA color format
   * @memberof NgxSpinnerComponent
   */
  @Input() bdColor: string;
  /**
   * To set spinner size
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() size: Size;
  /**
   * To set spinner color(DEFAULTS.SPINNER_COLOR)
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() color: string;
  /**
   * To set type of spinner
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() type: string;
  /**
   * To toggle fullscreen mode
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() fullScreen: boolean;
  /**
   * Spinner name
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() name: string;
  /**
   * Spinner Object
   *
   * @memberof NgxSpinnerComponent
   */
  spinner: NgxSpinner = new NgxSpinner();
  /**
   * Array for spinner's divs
   *
   * @memberof NgxSpinnerComponent
   */
  divArray: Array<number>;
  /**
   * Counter for div
   *
   * @memberof NgxSpinnerComponent
   *
   */
  divCount: number;
  /**
   * Show spinner
   *
   * @memberof NgxSpinnerComponent
  **/
  show: boolean;
  /**
   * Unsubscribe from spinner's observable
   *
   * @memberof NgxSpinnerComponent
  **/
  ngUnsubscribe: Subject<void> = new Subject();

  /**
   * Creates an instance of NgxSpinnerComponent.
   *
   * @memberof NgxSpinnerComponent
   */
  constructor(private spinnerService: NgxSpinnerService, private changeDetector: ChangeDetectorRef) {
    this.bdColor = DEFAULTS.BD_COLOR;
    this.size = 'large';
    this.color = DEFAULTS.SPINNER_COLOR;
    this.type = DEFAULTS.SPINNER_TYPE;
    this.fullScreen = true;
    this.name = PRIMARY_SPINNER;

    this.divArray = [];
    this.divCount = 0;
    this.show = false;
  }
  /**
   * Initialization method
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnInit() {
    this.setDefaultOptions();
    this.spinnerService.getSpinner(this.name)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((spinner: NgxSpinner) => {
        this.setDefaultOptions();
        Object.assign(this.spinner, spinner);
        if (spinner.show) {
          this.onInputChange();
        }
        this.changeDetector.markForCheck();
      });
  }
  /**
   * To set default ngx-spinner options
   *
   * @memberof NgxSpinnerComponent
   */
  setDefaultOptions = () => {
    this.spinner = new NgxSpinner({
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type,
      fullScreen: this.fullScreen,
      divArray: this.divArray,
      divCount: this.divCount,
      show: this.show
    });
  }
  /**
   * On changes event for input variables
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName) {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          return;
        } else if (typeof changedProp.currentValue !== 'undefined' && changedProp.currentValue !== changedProp.previousValue) {
          if (changedProp.currentValue !== '') {
            this.spinner[propName] = changedProp.currentValue;
          }
        }
      }
    }
  }
  /**
   * To get class for spinner
   *
   * @memberof NgxSpinnerComponent
   */
  getClass(type: string, size: Size): string {
    this.spinner.divCount = LOADERS[type];
    this.spinner.divArray = Array(this.spinner.divCount).fill(0).map((x, i) => i);
    let sizeClass = '';
    switch (size.toLowerCase()) {
      case 'small':
        sizeClass = 'la-sm';
        break;
      case 'medium':
        sizeClass = 'la-2x';
        break;
      case 'large':
        sizeClass = 'la-3x';
        break;
      default:
        break;
    }
    return 'la-' + type + ' ' + sizeClass;
  }
  /**
   * Check if input variables have changed
   *
   * @memberof NgxSpinnerComponent
   */
  onInputChange() {
    this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
  }
  /**
   * Component destroy event
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}
