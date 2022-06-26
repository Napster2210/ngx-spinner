import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { NgxSpinner, PRIMARY_SPINNER, Spinner } from "./ngx-spinner.enum";

@Injectable({
  providedIn: "root",
})
export class NgxSpinnerService {
  /**
   * Spinner observable
   *
   * @memberof NgxSpinnerService
   */
  // private spinnerObservable = new ReplaySubject<NgxSpinner>(1);
  public spinnerObservable = new BehaviorSubject<NgxSpinner>(null);
  /**
   * Creates an instance of NgxSpinnerService.
   * @memberof NgxSpinnerService
   */
  constructor() {}
  /**
   * Get subscription of desired spinner
   * @memberof NgxSpinnerService
   **/
  getSpinner(name: string): Observable<NgxSpinner> {
    return this.spinnerObservable
      .asObservable()
      .pipe(filter((x: NgxSpinner) => x && x.name === name));
  }
  /**
   * To show spinner
   *
   * @memberof NgxSpinnerService
   */
  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (spinner && Object.keys(spinner).length) {
          spinner["name"] = name;
          this.spinnerObservable.next(
            new NgxSpinner({ ...spinner, show: true })
          );
          resolve(true);
        } else {
          this.spinnerObservable.next(new NgxSpinner({ name, show: true }));
          resolve(true);
        }
      }, 10);
    });
  }
  /**
   * To hide spinner
   *
   * @memberof NgxSpinnerService
   */
  hide(name: string = PRIMARY_SPINNER, debounce: number = 10) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this.spinnerObservable.next(new NgxSpinner({ name, show: false }));
        resolve(true);
      }, debounce);
    });
  }
}
