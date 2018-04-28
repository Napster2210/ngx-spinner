/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app',
  template: `<ngx-spinner [bdColor]="spinnerConfig.bdColor" [size]="spinnerConfig.size"
  [color]="spinnerConfig.color" [loadingText]="spinnerConfig.loadigText"></ngx-spinner>
  <button (click)="showSpinner()">Start</button>`
})
class AppComponent implements OnInit {

  spinnerConfig: object = {
    bdColor: 'rgba(51,51,51,0.8)',
    size: 'large',
    color: '#fff',
    loadigText: 'Loading...'
  }

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show(); // Call this method to show spinner
  }

  showSpinner() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
  }
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSpinnerModule.forRoot()],
  providers: []
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
