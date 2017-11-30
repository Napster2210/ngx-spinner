import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NgxSpinnerService {

    public spinnerObservable = new Subject<boolean>();
    constructor() { }

    show() {
        this.spinnerObservable.next(true);
    }

    hide() {
        this.spinnerObservable.next(false);
    }
}
