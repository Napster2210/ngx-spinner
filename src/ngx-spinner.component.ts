import { Component, OnDestroy, Input } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ngx-spinner',
    templateUrl: 'ngx-spinner.component.html',
    styleUrls: ['ngx-spinner.component.css']
})

export class NgxSpinnerComponent implements OnDestroy {

    @Input() bdOpacity = 0.8;
    @Input() bdColor = '#333';
    @Input() size = 'large';
    @Input() color = '#fff';
    @Input() type = 'ball-scale-multiple';
    spinnerClass: string;
    showSpinner = false;
    spinnerSubscription: Subscription;
    constructor(private spinnerService: NgxSpinnerService) {
        this.spinnerClass = this.getClass(this.type, this.size) || 'la-ball-scale-multiple la-3x';
        this.spinnerSubscription = this.spinnerService.spinnerObservable.subscribe(flag => {
            this.showSpinner = flag;
        });
    }

    getClass(type: string, size: string): string {
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
        return sizeClass + ' la-' + type;
    }

    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}
