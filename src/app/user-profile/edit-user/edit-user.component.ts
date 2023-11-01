import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/user';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  // REWORK ME LATER, PLS
  constructor(public dialogRef: MatDialogRef<EditUserComponent>, public accountService: AccountService,
    private fb: FormBuilder, private userProfileService: UserProfileService) {

  }

  currentUser: User | null = null;
  errors: string[] | null = null;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        if (this.currentUser?.dateOfBirth) {
          const dateOfBirth = new Date(this.currentUser.dateOfBirth);
          this.profileForm.get('dateOfBirth')?.patchValue(dateOfBirth);
        }
      }
    });
  }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    username: ['', [Validators.required, Validators.maxLength(200)]],
    about: ['', [Validators.required, Validators.maxLength(256)]],
    dateOfBirth: new FormControl(new Date(), [Validators.required]),
  }
  );


  editUser() {
    const dateOfBirth = this.profileForm.value.dateOfBirth;

    if (dateOfBirth) {
      const formattedDate = this.transformDate(dateOfBirth as Date);
      console.log(formattedDate);
    }

    if (this.currentUser) {
      const email = this.profileForm.value.email;
      const userName = this.profileForm.value.username;
      const dateOfBirth = this.profileForm.value.dateOfBirth;
      const about = this.profileForm.value.about;

      if (typeof email === 'string') {
        this.currentUser.email = email;
      }
      if (typeof userName === 'string') {
        this.currentUser.userName = userName;
      }
      if (dateOfBirth instanceof Date) {
        this.currentUser.dateOfBirth = this.transformDate(dateOfBirth);
      }
      if(typeof about === 'string'){
        this.currentUser.about = about
      }

      console.log(this.currentUser);

      if (this.currentUser) {
        this.userProfileService.editUser(this.currentUser).subscribe({
          next: () => this.onNoClick(),
          error: error => this.errors = error.errors
        })
      }
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  transformDate(value: Date): string {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
