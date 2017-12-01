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
  template: `<ngx-spinner [backdrop]="backdrop"></ngx-spinner>`
})
class AppComponent implements OnInit {
  backdrop: object = {
    'opacity': 0.8,
    'background-color': '#333'
  }

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(); // Call this method to show spinner
  }
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSpinnerModule.forRoot()],
  providers: [NgxSpinnerService]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
