import { Component, OnDestroy, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, Attribute } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LOADERS, DEFAULTS, Size, NgxSpinner, PRIMARY_SPINNER } from './ngx-spinner.enum';

@Component({
  selector: 'ngx-spinner',
  templateUrl: 'ngx-spinner.component.html',
  styleUrls: ['ngx-spinner.component.css']
})
export class NgxSpinnerComponent implements OnDestroy, OnInit, OnChanges {

  /**
   * Spinner name
   * @memberof NgxSpinnerComponent
   */
  private name: string;
  /**
   * To set backdrop color(DEFAULTS.BD_COLOR)
   * Only supports RGBA color format
   * @memberof NgxSpinnerComponent
   */
  @Input() bdColor = DEFAULTS.BD_COLOR;
  /**
   * To set spinner size
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() size: Size = 'large';
  /**
   * To set spinner color(DEFAULTS.SPINNER_COLOR)
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() color = DEFAULTS.SPINNER_COLOR;
  /**
   * To set type of spinner
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() type = DEFAULTS.SPINNER_TYPE;
  /**
   * To toggle fullscreen mode
   *
   * @memberof NgxSpinnerComponent
   */
  @Input() fullScreen = true;
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
  divArray: Array<number> = [];
  /**
   * Counter for div
   *
   * @memberof NgxSpinnerComponent
   *
   */
  divCount = 0;
  /**
   * Show spinner
   *
   * @memberof NgxSpinnerComponent
  **/
  show = false;
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
  constructor(
    private spinnerService: NgxSpinnerService,
    @Attribute('name') name: string) {
    this.name = name || PRIMARY_SPINNER;
  }
  /**
   * Initialization method
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnInit() {
    this.spinner = new NgxSpinner({
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type,
      fullScreen: this.fullScreen
    });

    this.spinnerService.getSpinner(this.name)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((spinner: NgxSpinner) => {
        Object.assign(this.spinner, spinner);
        this.show = !this.show;
        if (this.show) {
          this.onInputChange();
        }
      });
  }
  /**
   * On changes event for input variables
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    const typeChange: SimpleChange = changes.type;
    const sizeChange: SimpleChange = changes.size;

    if (typeChange) {
      if (typeof typeChange.currentValue !== 'undefined' && typeChange.currentValue !== typeChange.previousValue) {
        if (typeChange.currentValue !== '') {
          this.spinner.type = typeChange.currentValue;

        }
      }
    }

    if (sizeChange) {
      if (typeof sizeChange.currentValue !== 'undefined' && sizeChange.currentValue !== sizeChange.previousValue) {
        if (sizeChange.currentValue !== '') {
          this.spinner.size = sizeChange.currentValue;

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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
