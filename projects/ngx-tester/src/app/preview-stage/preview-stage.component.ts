import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerDemoConfig } from "../spinner-demo-config.model";

@Component({
  selector: "app-preview-stage",
  templateUrl: "./preview-stage.component.html",
  styleUrls: ["./preview-stage.component.css"],
  imports: [NgxSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewStageComponent {
  /** Already has `bdColor` resolved to its final `rgba(...)` string. */
  readonly config = input.required<SpinnerDemoConfig>();
  readonly toggleShow = output<void>();
}
