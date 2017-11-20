import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from './ngx-spinner.component';
import { NgxSpinnerService } from './ngx-spinner.service';

export * from './ngx-spinner.component';
export * from './ngx-spinner.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxSpinnerComponent
  ],
  exports: [
    NgxSpinnerComponent
  ]
})
export class NgxSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSpinnerModule,
      providers: [NgxSpinnerService]
    };
  }
}
