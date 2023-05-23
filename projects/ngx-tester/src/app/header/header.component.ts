import { Component } from '@angular/core';
import pJSON from "../../../../../package.json";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  packageVersion: string = pJSON?.version || "";
  constructor() { }

}
