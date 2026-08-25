import { ChangeDetectionStrategy, Component, computed, effect, signal } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { TypeGalleryComponent } from "./type-gallery/type-gallery.component";
import { PreviewStageComponent } from "./preview-stage/preview-stage.component";
import { ConfigPanelComponent } from "./config-panel/config-panel.component";
import { CodePanelComponent } from "./code-panel/code-panel.component";
import { DEFAULT_DEMO_CONFIG, SpinnerDemoConfig, toRgba } from "./spinner-demo-config.model";
import pJSON from "../../../../package.json";

/**
 * Root shell for the ngx-spinner playground: owns the shared demo config as
 * a single signal and wires it into the header, type gallery, preview
 * stage, config panel and code panel.
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [
    HeaderComponent,
    TypeGalleryComponent,
    PreviewStageComponent,
    ConfigPanelComponent,
    CodePanelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly theme = signal<"dark" | "light">("dark");
  readonly config = signal<SpinnerDemoConfig>(DEFAULT_DEMO_CONFIG);

  /** Config with `bdColor` resolved from hex + alpha into the `rgba(...)` string the library expects. */
  readonly resolvedConfig = computed<SpinnerDemoConfig>(() => {
    const c = this.config();
    return { ...c, bdColor: toRgba(c.bdColor, c.alpha) };
  });

  readonly packageVersion = pJSON?.version || "";

  /** Auto-hide duration for the fullscreen preview - see the comment on the effect below. */
  private static readonly AUTO_HIDE_MS = 3000;
  private autoHideTimer?: ReturnType<typeof setTimeout>;
  private wasShowingFullscreen = false;

  constructor() {
    effect(() => {
      document.documentElement.setAttribute("data-theme", this.theme());
    });

    // A fullscreen spinner covers the entire viewport - including this app's
    // own "Hide spinner" controls - so once shown there'd be nothing left to
    // click to dismiss it (this is correct behavior for a real loading
    // overlay: it's meant to block interaction with the page underneath).
    // Auto-hide it after a few seconds so the playground itself never gets
    // stuck, matching how the "Start Spinner" demo behaved previously.
    effect(() => {
      const c = this.config();
      const showingFullscreen = c.showSpinner && c.fullScreen;
      if (showingFullscreen && !this.wasShowingFullscreen) {
        clearTimeout(this.autoHideTimer);
        this.autoHideTimer = setTimeout(() => {
          this.config.update((cur) => ({ ...cur, showSpinner: false }));
        }, AppComponent.AUTO_HIDE_MS);
      } else if (!showingFullscreen) {
        clearTimeout(this.autoHideTimer);
      }
      this.wasShowingFullscreen = showingFullscreen;
    });
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === "dark" ? "light" : "dark"));
  }

  onTypeSelected(type: string): void {
    this.config.update((c) => ({ ...c, type }));
  }

  onToggleShow(): void {
    this.config.update((c) => ({ ...c, showSpinner: !c.showSpinner }));
  }
}
