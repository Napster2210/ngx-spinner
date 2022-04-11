import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NgxSpinnerComponent } from './ngx-spinner.component';
import { NGX_SPINNER_CONFIG, NgxSpinnerConfig } from './config';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxSpinnerComponent, SafeHtmlPipe],
  exports: [NgxSpinnerComponent]
})
export class NgxSpinnerModule {
  static forRoot(config?: NgxSpinnerConfig): ModuleWithProviders<NgxSpinnerModule> {
    return {
      ngModule: NgxSpinnerModule,
      providers: [
        { provide: NGX_SPINNER_CONFIG, useValue: config }
      ]
    }
  }
}
