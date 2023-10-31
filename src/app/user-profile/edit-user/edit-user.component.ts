import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<EditUserComponent>, public accountService: AccountService,
    private fb: FormBuilder, private userProfileService: UserProfileService) {

  }

  currentUser: User | null = null;

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

      if (typeof email === 'string') {
        this.currentUser.email = email;
      }
      if (typeof userName === 'string') {
        this.currentUser.userName = userName;
      }
      if (dateOfBirth instanceof Date) {
        this.currentUser.dateOfBirth = this.transformDate(dateOfBirth);
      }

      console.log(this.currentUser);

      if (this.currentUser) {
        this.userProfileService.editUser(this.currentUser).subscribe();
      }
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)], [this.validateEmailNotTaken()]],
    username: ['', [Validators.required, Validators.maxLength(200)], [this.validateUserNameNotTaken()]],
    dateOfBirth: new FormControl(new Date(), [Validators.required]),
  }
  );

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? { emailExists: true } : null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }

  validateUserNameNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkUserNameExists(control.value).pipe(
            map(result => result ? { usernameExists: true } : null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }

  transformDate(value: Date): string {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
