import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ngx-spinner',
    templateUrl: 'ngx-spinner.component.html',
    styleUrls: ['ngx-spinner.component.css']
})

export class NgxSpinnerComponent implements OnDestroy {
    showSpinner = false;
    spinnerSubscription: Subscription;
    constructor(private spinner: NgxSpinnerService) {
        this.spinnerSubscription = this.spinner.spinnerObservable.subscribe(flag => {
            this.showSpinner = flag;
        });
    }

    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}
