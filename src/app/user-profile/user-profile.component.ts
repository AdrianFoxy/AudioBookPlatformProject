import { Component } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode-service/dark-mode.service';
import { LanguageService } from '../core/services/language-service/language.service';
import { AccountService } from '../account/account.service';
import { LoaderService } from '../core/services/loader-service/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import * as moment from 'moment';
import { User } from '../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userData?: User;

  sortOptions = [
    { name: 'Всі', engName: 'All', value: 'all' },
    { name: 'Читаю', engName: 'Reading', value: 'reading' },
    { name: 'Прочитав', engName: 'Read', value: 'Rread' },
    { name: 'Планую', engName: 'Plan', value: 'plan' },
  ];

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService,
    public loaderService: LoaderService, public accountService: AccountService,
    private dialogRef : MatDialog, private activatedRoute: ActivatedRoute,
    private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    if (username) this.userProfileService.getUser(username).subscribe({
      next: userData => {
        this.userData = userData;
      },
      error: error => console.log(error)
    })
  }


  formatDate(dateString: string): string {
    const date = moment(dateString);
    return date.format('YYYY-MM-DD');
  }


  openDialog(){
    this.dialogRef.open(EditUserComponent, {
      data: this.userData
    });
  }

}
