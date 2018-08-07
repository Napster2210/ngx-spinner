import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public spinnerConfig: any = {
    bdColor: 'rgba(51,51,51,0.8)',
    size: 'large',
    color: '#fff',
    loadigText: 'Loading...'
  };

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
