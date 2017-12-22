import { Component, OnDestroy, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
    styleUrls: ['ngx-spinner.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxSpinnerComponent implements OnDestroy, OnInit {

    /**
     * Local variable for backdrop opacity
     *
     * @memberof NgxSpinnerComponent
     */
    _bdOpacity = 0.8;

    /**
     * To set backdrop opacity(0.8)
     *
     * @memberof NgxSpinnerComponent
     */
    @Input()
    public set bdOpacity(opacity: number) {
        this._bdOpacity = opacity;
    }

    /**
     * To get value of backdrop opacity
     *
     * @readonly
     * @type {number}
     * @memberof NgxSpinnerComponent
     */
    public get bdOpacity(): number {
        return this._bdOpacity;
    }

    /**
     * Local variable for backdrop color
     *
     * @memberof NgxSpinnerComponent
     */
    _bdColor = '#333';

    /**
     * To set backdrop color('#333')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input()
    public set bdColor(color: string) {
        this._bdColor = color;
    }

    /**
     * To get value of backdrop color
     *
     * @readonly
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    public get bdColor(): string {
        return this._bdColor;
    }

    /**
     * Local variable for spinner size
     *
     * @memberof NgxSpinnerComponent
     */
    _size = '';

    /**
     * To set spinner size
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    @Input()
    public set size(value: string) {
        this._size = value;
    }

    /**
     * To get value of spinner size
     *
     * @readonly
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    public get size(): string {
        return this._size;
    }

    /**
     * Local variable for spinner color
     *
     * @memberof NgxSpinnerComponent
     */
    _color = '#fff';

    /**
     * To set spinner color('#fff')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input()
    public set color(value: string) {
        this._color = value;
    }

    /**
     * To get value of spinner color
     *
     * @readonly
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    public get color(): string {
        return this._color;
    }

    /**
     * Local variable for spinner type
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    _type: string;

    /**
     * To set type of spinner
     *
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    @Input()
    public set type(value: string) {
        this._type = value;
    }

    /**
     * To get value of spinner type
     *
     * @readonly
     * @type {string}
     * @memberof NgxSpinnerComponent
     */
    public get type(): string {
        return this._type;
    }

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

    /**
     * Array for spinner divs
     *
     * @type {Array<number>}
     * @memberof NgxSpinnerComponent
     */
    divArray: Array<number> = [];

    /**
     * Counter for div
     *
     * @memberof NgxSpinnerComponent
     */
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
