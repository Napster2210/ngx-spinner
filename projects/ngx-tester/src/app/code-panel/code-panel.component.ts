import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { SpinnerDemoConfig } from "../spinner-demo-config.model";
import { CodeToken, tokenize } from "../code-highlight.util";

type Tab = "html" | "ts";

@Component({
  selector: "app-code-panel",
  templateUrl: "./code-panel.component.html",
  styleUrls: ["./code-panel.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePanelComponent {
  /** Already has `bdColor` resolved to its final `rgba(...)` string. */
  readonly config = input.required<SpinnerDemoConfig>();

  readonly tab = signal<Tab>("html");
  readonly copied = signal(false);

  private readonly htmlCode = computed(() => this.buildHtmlCode(this.config()));
  private readonly tsCode = computed(() => this.buildTsCode(this.config()));

  readonly code = computed(() => (this.tab() === "html" ? this.htmlCode() : this.tsCode()));
  readonly tokens = computed<CodeToken[]>(() => tokenize(this.code()));

  setTab(tab: Tab): void {
    this.tab.set(tab);
  }

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - nothing else we can do.
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1600);
  }

  private buildHtmlCode(c: SpinnerDemoConfig): string {
    const lines = ["<ngx-spinner"];
    if (c.name) {
      lines.push(`  name="${c.name}"`);
    }
    lines.push(`  bdColor="${c.bdColor}"`);
    lines.push(`  size="${c.size}"`);
    lines.push(`  color="${c.color}"`);
    lines.push(`  type="${c.type}"`);
    lines.push(`  [fullScreen]="${c.fullScreen}"`);
    lines.push(`  [zIndex]="${c.zIndex}"`);
    if (!c.usePopover) {
      lines.push(`  [usePopover]="false"`);
    }
    if (c.disableAnimation) {
      lines.push(`  [disableAnimation]="true"`);
    }
    if (c.template) {
      lines.push(`  template="${c.template}"`);
    }
    const open = lines.join("\n") + ">";
    if (c.loadingText) {
      return `${open}\n  <p style="color: white">${c.loadingText}</p>\n</ngx-spinner>`;
    }
    return `${open}</ngx-spinner>`;
  }

  private buildTsCode(c: SpinnerDemoConfig): string {
    const opts = [
      `type: '${c.type}'`,
      `size: '${c.size}'`,
      `bdColor: '${c.bdColor}'`,
      `color: '${c.color}'`,
      `fullScreen: ${c.fullScreen}`,
      `zIndex: ${c.zIndex}`,
    ];
    if (!c.usePopover) {
      opts.push("usePopover: false");
    }
    if (c.disableAnimation) {
      opts.push("disableAnimation: true");
    }
    if (c.template) {
      opts.push(`template: '${c.template}'`);
    }
    const name = c.name || "primary";
    return [
      "import { NgxSpinnerService } from 'ngx-spinner';",
      "",
      "constructor(private spinner: NgxSpinnerService) {}",
      "",
      "load() {",
      `  this.spinner.show('${name}', {`,
      `      ${opts.join(",\n      ")}`,
      "  });",
      "",
      `  setTimeout(() => this.spinner.hide('${name}'), 3000);`,
      "}",
    ].join("\n");
  }
}
