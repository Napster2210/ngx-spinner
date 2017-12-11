import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

/**
 * Spinner service
 *
 * @export
 * @class NgxSpinnerService
 */
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
    constructor(private http: HttpClient) { }

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

    getCount(key: string): number {
        const data = this.http.get('./loader.json');
        console.log(data);
        return data[key];
    }
}
