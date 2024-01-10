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
import { AudioBook } from '../shared/models/libraryModels/audiobook';
import { userLibraryParams } from '../shared/models/paramsModels/userLibraryParams';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userData?: User;

  audioBooks: AudioBook[] = [];
  userLibraryParams = new userLibraryParams();
  totalCount = 0;
  isUserMatched: boolean = false; // Add this property

  sortOptions = [
    { name: 'Всі', engName: 'All', value: 0 },
    { name: 'Читаю', engName: 'Reading', value: 1 },
    { name: 'Прочитав', engName: 'Read', value: 2 },
    { name: 'Планую', engName: 'Plan', value: 3 },
  ];

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService,
    public loaderService: LoaderService, public accountService: AccountService,
    private dialogRef : MatDialog, private activatedRoute: ActivatedRoute,
    private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  getUserLibarary(){
    if(this.userData)
    this.userLibraryParams.userId = this.userData?.id
    this.userProfileService.getUserLibrary(this.userLibraryParams).subscribe({
      next: response => {
        this.audioBooks = response.data;
        this.userLibraryParams.pageNumber = response.pageIndex;
        this.userLibraryParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })

  }

  onSortSelected(event: any){
    this.userLibraryParams.statusId = event.value;
    console.log(this.userLibraryParams.statusId);
    this.getUserLibarary();
  }


  onPageChanged(event: any){
    if(this.userLibraryParams.pageNumber !== event) {
      this.userLibraryParams.pageNumber = event;
      this.getUserLibarary();
    }
  }

  loadUser() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    if (username) this.userProfileService.getUser(username).subscribe({
      next: userData => {
        this.userData = userData;
        this.getUserLibarary();
        this.accountService.currentUser$.subscribe(currentUser => {
          this.isUserMatched = currentUser?.userName === userData.userName;
        });
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
