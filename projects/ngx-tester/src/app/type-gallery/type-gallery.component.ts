import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import { SPINNER_TYPES } from "../spinner-types";

@Component({
  selector: "app-type-gallery",
  templateUrl: "./type-gallery.component.html",
  styleUrls: ["./type-gallery.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeGalleryComponent {
  readonly selectedType = input.required<string>();
  readonly typeSelected = output<string>();

  readonly total = SPINNER_TYPES.length;
  readonly query = signal("");
  readonly types = SPINNER_TYPES;

  readonly visibleTypes = computed(() => {
    const q = this.query().trim().toLowerCase();
    return q ? this.types.filter((t) => t.name.includes(q)) : this.types;
  });

  onQueryChange(value: string): void {
    this.query.set(value);
  }

  select(name: string): void {
    this.typeSelected.emit(name);
  }
}
