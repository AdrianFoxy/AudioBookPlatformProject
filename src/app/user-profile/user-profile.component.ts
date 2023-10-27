import { Component } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode-service/dark-mode.service';
import { LanguageService } from '../core/services/language-service/language.service';
import { AccountService } from '../account/account.service';
import { LoaderService } from '../core/services/loader-service/loader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  sortOptions = [
    { name: 'Всі', engName: 'All', value: 'all' },
    { name: 'Читаю', engName: 'Reading', value: 'reading' },
    { name: 'Прочитав', engName: 'Read', value: 'Rread' },
    { name: 'Планую', engName: 'Plan', value: 'plan' },
  ];

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService,
    public loaderService: LoaderService, public accountService: AccountService) {
  }

  getFormattedDate(apiDate: string): string {
    const date = new Date(apiDate);
    return date.toISOString().slice(0, 10);
  }

}
