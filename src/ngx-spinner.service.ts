import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
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
     *
     * @memberof NgxSpinnerService
     */
    show() {
        this.spinnerObservable.next(true);
    }

    /**
     * To hide spinner
     *
     * @memberof NgxSpinnerService
     */
    hide() {
        this.spinnerObservable.next(false);
    }
}
