import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Pipe, PipeTransform, inject } from "@angular/core";

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
  return value ? this.sanitizer.bypassSecurityTrustHtml(value) : '';
  }
}
