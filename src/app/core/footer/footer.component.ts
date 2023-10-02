import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';
import { LanguageService } from '../services/language-service/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService) {
  }


}
