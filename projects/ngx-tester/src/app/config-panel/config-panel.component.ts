import { ChangeDetectionStrategy, Component, model } from "@angular/core";
import { SIZES, SpinnerDemoConfig } from "../spinner-demo-config.model";
import { Size } from "ngx-spinner";

@Component({
  selector: "app-config-panel",
  templateUrl: "./config-panel.component.html",
  styleUrls: ["./config-panel.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPanelComponent {
  readonly config = model.required<SpinnerDemoConfig>();

  readonly sizes = SIZES;

  patch(change: Partial<SpinnerDemoConfig>): void {
    this.config.update((c) => ({ ...c, ...change }));
  }

  setSize(size: Size): void {
    this.patch({ size });
  }

  onAlphaInput(event: Event): void {
    this.patch({ alpha: Number((event.target as HTMLInputElement).value) });
  }

  onZIndexChange(event: Event): void {
    this.patch({ zIndex: Number((event.target as HTMLInputElement).value) });
  }

  toggle(key: "fullScreen" | "showSpinner" | "disableAnimation" | "usePopover"): void {
    this.config.update((c) => ({ ...c, [key]: !c[key] }));
  }
}
