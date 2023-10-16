import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(public darkmodeService: DarkModeService) {
  }
}
