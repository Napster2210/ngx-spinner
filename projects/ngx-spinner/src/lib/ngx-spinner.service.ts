import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ALL_SPINNERS, NgxSpinner, PRIMARY_SPINNER, Spinner} from './ngx-spinner.enum';

@Injectable({
  providedIn: 'root'
})
export class NgxSpinnerService {
  /**
   * Spinner observable
   *
   * @memberof NgxSpinnerService
   */
  private spinnerObservable = new ReplaySubject<NgxSpinner>(1);

  private spinners: string[] = [];

  /**
   * Creates an instance of NgxSpinnerService.
   * @memberof NgxSpinnerService
   */
  constructor() {
  }

  /**
   * Get subscription of desired spinner
   * @memberof NgxSpinnerService
   **/
  getSpinner(name: string): Observable<NgxSpinner> {
    if (!this.spinners.includes(name)) {
      this.spinners.push(name);
    }

    return this.spinnerObservable.asObservable().pipe(filter((x: NgxSpinner) => x && x.name === name));
  }

  /**
   * To show spinner
   *
   * @memberof NgxSpinnerService
   */
  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    const showPromise = new Promise((resolve, reject) => {
      if (spinner && Object.keys(spinner).length) {
        spinner['name'] = name;
        this.spinnerObservable.next(new NgxSpinner({...spinner, show: true}));
        resolve(true);
      } else {
        this.spinnerObservable.next(new NgxSpinner({name, show: true}));
        resolve(true);
      }
    });
    return showPromise;
  }

  /**
   * To hide spinner
   *
   * @memberof NgxSpinnerService
   */
  hide(name: string = ALL_SPINNERS) {
    const hidePromise = new Promise((resolve, reject) => {
      if (name === ALL_SPINNERS) {
        this.spinners.forEach((spinnerName) => {
          this.spinnerObservable.next(new NgxSpinner({name: spinnerName, show: false}));
        });
      } else {
        this.spinnerObservable.next(new NgxSpinner({name, show: false}));
      }
      resolve(true);
    });
    return hidePromise;
  }
}
