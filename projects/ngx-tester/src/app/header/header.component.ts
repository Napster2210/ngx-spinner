import { ChangeDetectionStrategy, Component, input, output, signal } from "@angular/core";
import pJSON from "../../../../../package.json";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly theme = input.required<"dark" | "light">();
  readonly themeToggle = output<void>();

  readonly packageVersion = pJSON?.version || "";
  readonly installCopied = signal(false);

  async copyInstall(): Promise<void> {
    try {
      await navigator.clipboard.writeText("npm i ngx-spinner");
    } catch {
      // Clipboard API unavailable - nothing else we can do.
    }
    this.installCopied.set(true);
    setTimeout(() => this.installCopied.set(false), 1600);
  }
}
