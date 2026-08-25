import { enableProdMode, provideZoneChangeDetection } from "@angular/core";

import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection()],
}).catch((err) => console.error(err));
