import { Component, ViewChild, HostListener, OnInit, inject } from "@angular/core";
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ColorPickerModule } from "ngx-color-picker";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { BannerComponent } from "./banner/banner.component";
import { HeaderComponent } from "./header/header.component";

const TABLET_SIZE = 768;
const MOBILE_SIZE = 425;

/**
 * App Component
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [
    HeaderComponent,
    BannerComponent,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    ColorPickerModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgxSpinnerModule
],
})
export class AppComponent {
  private spinner = inject(NgxSpinnerService);

  /**
   * Array for spinner size
   *
   * @type {Array<string>}
   * @memberof AppComponent
   */
  sizeArray: Array<string> = ["small", "default", "medium", "large"];

  /**
   * Loading Text for spinner
   *
   * @type {string}
   * @memberof AppComponent
   */
  loadingText = "Loading...";

  /**
   * Spinner configuration
   *
   * @type {object}
   * @memberof AppComponent
   */
  spinnerConfig: object = {
    bdColor: "rgba(0, 0, 0, 0.8)",
    size: "medium",
    color: "#fff",
    type: "square-jelly-box",
    fullScreen: true,
    template: null,
    showSpinner: false,
  };

  /**
   * Array of loaders
   *
   * @type {Array<string>}
   * @memberof AppComponent
   */
  loaders: Array<string> = [
    "ball-8bits",
    "ball-atom",
    "ball-beat",
    "ball-circus",
    "ball-climbing-dot",
    "ball-clip-rotate",
    "ball-clip-rotate-multiple",
    "ball-clip-rotate-pulse",
    "ball-elastic-dots",
    "ball-fall",
    "ball-fussion",
    "ball-grid-beat",
    "ball-grid-pulse",
    "ball-newton-cradle",
    "ball-pulse",
    "ball-pulse-rise",
    "ball-pulse-sync",
    "ball-rotate",
    "ball-running-dots",
    "ball-scale",
    "ball-scale-multiple",
    "ball-scale-pulse",
    "ball-scale-ripple",
    "ball-scale-ripple-multiple",
    "ball-spin",
    "ball-spin-clockwise",
    "ball-spin-clockwise-fade",
    "ball-spin-clockwise-fade-rotating",
    "ball-spin-fade",
    "ball-spin-fade-rotating",
    "ball-spin-rotate",
    "ball-square-clockwise-spin",
    "ball-square-spin",
    "ball-triangle-path",
    "ball-zig-zag",
    "ball-zig-zag-deflect",
    "cube-transition",
    "fire",
    "line-scale",
    "line-scale-party",
    "line-scale-pulse-out",
    "line-scale-pulse-out-rapid",
    "line-spin-clockwise-fade",
    "line-spin-clockwise-fade-rotating",
    "line-spin-fade",
    "line-spin-fade-rotating",
    "pacman",
    "square-jelly-box",
    "square-loader",
    "square-spin",
    "timer",
    "triangle-skew-spin",
  ];

  @ViewChild("codeElem") codeElement;

  noOfColumns = 3;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    const deviceWidth = event.target.innerWidth;
    if (deviceWidth <= MOBILE_SIZE) {
      this.noOfColumns = 1;
    } else if (deviceWidth <= TABLET_SIZE) {
      this.noOfColumns = 2;
    }
  }

  /**
   * Creates an instance of AppComponent.
   * @memberof AppComponent
   */
  constructor() {
    const deviceWidth = window.innerWidth;
    if (deviceWidth <= MOBILE_SIZE) {
      this.noOfColumns = 1;
    } else if (deviceWidth <= TABLET_SIZE) {
      this.noOfColumns = 2;
    }
  }

  /**
   * To show/hide spinner
   *
   * @memberof AppComponent
   */
  showSpinner(name: string) {
    this.spinner.show(name);
    this.spinner.hide(name, 3000);
  }

  /**
   * To copy code of ngx-spinner
   *
   * @memberof AppComponent
   */
  copyCode = () => {
    const copyText = this.codeElement.nativeElement; // document.getElementsByClassName('code');
    window.getSelection().selectAllChildren(copyText);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  setFullscreenMode = () => {
    this.spinnerConfig["fullScreen"] = !this.spinnerConfig["fullScreen"];
  };
}
