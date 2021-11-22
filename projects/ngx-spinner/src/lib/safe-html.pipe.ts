import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
    //do nothing
  }

  transform(v: string): SafeHtml {
    return v ? this._sanitizer.bypassSecurityTrustHtml(v) : undefined;
  }

}
