import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerComponent } from './ngx-spinner.component';
import { NgxSpinnerService } from './ngx-spinner.service';

export * from './ngx-spinner.component';
export * from './ngx-spinner.service';

/**
 * Main module
 *
 * @export
 * @class NgxSpinnerModule
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    NgxSpinnerComponent
  ],
  exports: [
    NgxSpinnerComponent
  ],
  providers: [NgxSpinnerService]
})
export class NgxSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSpinnerModule,
      providers: [NgxSpinnerService]
    };
  }
}
