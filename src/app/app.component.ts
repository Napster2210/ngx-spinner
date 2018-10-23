import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadingText: string;

  public spinnerConfig: any = {
    bdColor: 'rgba(55,55,51,0.8)',
    size: 'medium',
    color: 'rgba(123,255,51,0.8)',
  };

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(name?: string) {
    this.spinner.show(name);
    setTimeout(() => this.spinner.hide(name), 5000);
  }

  changeAndShowSpinner(){
    this.loadingText = 'added text';
    this.spinner.show(undefined, { type: 'line-scale-party', size: 'large', bdColor: 'rgba(100,149,237, .8)', color: 'white'});
    setTimeout(() => this.spinner.hide(), 3000);
  }

  goCrazy(){
    this.spinner.show('1');
    setInterval(() => this.spinner.show('1'), 1000);
    setInterval(() => this.spinner.show('2'), 2000);
    setInterval(() => this.spinner.show('Wasabi'), 3000);
    setInterval(() => this.spinner.show('Catchup'), 1000);
    setInterval(() => this.spinner.show(), 5000);
  }

}
