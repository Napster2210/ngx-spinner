import { Component } from '@angular/core';
import pJSON from "../../../../../package.json";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [MatToolbarModule]
})
export class HeaderComponent {

  packageVersion: string = pJSON?.version || "";
  constructor() { }

}
