import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PRIMARY_SPINNER, NgxSpinner, Spinner } from './ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class NgxSpinnerService {
  /**
   * Spinner observable
   *
   * @memberof NgxSpinnerService
   */
  private spinnerObservable = new Subject<NgxSpinner>();

  /**
   * Creates an instance of NgxSpinnerService.
   * @memberof NgxSpinnerService
   */
  constructor() { }

  /**
  * Get subscription of desired spinner
  * @memberof NgxSpinnerService
  **/
  getSpinner(name: string): Observable<NgxSpinner> {
    return this.spinnerObservable.asObservable().pipe(filter((x:NgxSpinner) => x && x.name == name));
  }

  /**
   * To show spinner
   *
   * @memberof NgxSpinnerService
   */
  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    if(spinner) this.spinnerObservable.next(new NgxSpinner({name: name, ...spinner}));
    else this.spinnerObservable.next(new NgxSpinner({ name }));
  }

  /**
  * To hide spinner
  *
  * @memberof NgxSpinnerService
  */
  hide(name: string = PRIMARY_SPINNER): void {
    this.spinnerObservable.next(new NgxSpinner({ name }));
  }

}
