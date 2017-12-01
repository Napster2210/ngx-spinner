import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { Backdrop } from './backdrop.interface';
import { Spinner } from './spinner.interface';

@Component({
    selector: 'ngx-spinner',
    templateUrl: 'ngx-spinner.component.html',
    styleUrls: ['ngx-spinner.component.css']
})

export class NgxSpinnerComponent implements OnDestroy, OnInit {

    @Input() backdrop: Backdrop = {
        'opacity': 0.8,
        'background-color': '#333'
    }
    @Input() spinner: Spinner = {
        'size': 'large',
        'color': '#fff',
        'type': 'ball-scale-multiple'
    }
    spinnerClass: string;
    showSpinner = false;
    spinnerSubscription: Subscription;
    constructor(private spinnerService: NgxSpinnerService) {
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

    ngOnInit() {
        this.spinnerClass = this.getClass(this.spinner.type, this.spinner.size) || 'la-ball-scale-multiple la-3x';
    }

    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}
