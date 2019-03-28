import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxSpinnerService {
  /**
   * Spinner observable
   *
   * @memberof NgxSpinnerService
   */
  public spinnerObservable = new Subject<boolean>();
  /**
   * Creates an instance of NgxSpinnerService.
   * @memberof NgxSpinnerService
   */
  constructor() { }
  /**
   * To show spinner
   * timeout feature to avoid infinite loop.default to 35 seconds (Max REST Api Timeout is 30 seconds)
   * @memberof NgxSpinnerService
   */
  show(timeout?: number) {
    this.spinnerObservable.next({showSpinner: true,timeout: timeout ? timeout : 35000}); 
  }
  /**
   * To hide spinner
   *
   * @memberof NgxSpinnerService
   */
  hide() {
    this.spinnerObservable.next({showSpinner: false,timeout:null});
  }
}
