import { Component } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public darkmodeService: DarkModeService) {
  }
}
