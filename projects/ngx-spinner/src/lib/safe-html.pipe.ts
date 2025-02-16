import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
  return value ? this.sanitizer.bypassSecurityTrustHtml(value) : '';
  }
}
