import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { LOADERS } from './loader.layout';

/**
 * Main component
 *
 * @export
 * @class NgxSpinnerComponent
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
    selector: 'ngx-spinner',
    templateUrl: 'ngx-spinner.component.html',
    styleUrls: ['ngx-spinner.component.css']
})

export class NgxSpinnerComponent implements OnDestroy, OnInit {
    /**
     * To set backdrop opacity(0.8)
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() bdOpacity = 0.8;
    /**
     * To set backdrop color('#333')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() bdColor = '#333';
    /**
     * To set spinner size
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    @Input() size: string;
    /**
     * To set spinner color('#fff')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() color = '#fff';
    /**
     * To set type of spinner
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    @Input() type: string;
    /**
     * Class for spinner
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    spinnerClass: string;
    /**
     * Flag to show/hide spinner
     *
     * @memberof NgxSpinnerComponent
     */
    showSpinner = false;
    /**
     * Subscription variable for spinner
     *
     * @type {Subscription}
     * @memberof NgxSpinnerComponent
     */
    spinnerSubscription: Subscription;

    divArray: Array<number> = [];
    divCount = 0;


    /**
     * Creates an instance of NgxSpinnerComponent.
     * @param {NgxSpinnerService} spinnerService Service for spinner functionality
     * @memberof NgxSpinnerComponent
     */
    constructor(private spinnerService: NgxSpinnerService) {
        this.spinnerSubscription = this.spinnerService.spinnerObservable.subscribe(flag => {
            this.showSpinner = flag;
        });
    }

    /**
     * Initialization method
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnInit() {
        this.spinnerClass = this.getClass(this.type, this.size);
    }

    /**
     * To get class for spinner
     *
     * @param {string} [type='ball-scale-multiple'] Spinner type
     * @param {string} [size='large'] Spinner size
     * @returns {string} It'll return spinner class
     * @memberof NgxSpinnerComponent
     */
    getClass(type = 'ball-scale-multiple', size = 'large'): string {
        this.divCount = LOADERS[type];
        this.divArray = Array(this.divCount).fill(0).map((x, i) => i);
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
        return 'la-' + type + ' ' + sizeClass;
    }

    /**
     * Component destroy event
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}
