import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/core/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public darkmodeService: DarkModeService) {
  }
}
