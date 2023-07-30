import { Component } from '@angular/core';
import {logo} from "../../../core/constants/constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected readonly logo = logo;
}
