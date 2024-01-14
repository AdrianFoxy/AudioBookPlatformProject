import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { UserProfileService } from '../user-profile.service';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  // REWORK ME LATER, PLS
  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private fb: FormBuilder, private userProfileService: UserProfileService, public langService: LanguageService,
    private dateAdapter: DateAdapter<Date>, private toastr: ToastrService) {
      if(langService.whatCurrentLang() == 'en-US'){
        this.dateAdapter.setLocale('en-US');
      } else {
        this.dateAdapter.setLocale('uk-UA');
      }

      console.log(this.userData.user);

  }

  errors: string[] | null = null;

  ngOnInit(): void {
    if (this.userData.user) {
      const dateOfBirth = new Date(this.userData.user.dateOfBirth);
      this.profileForm.get('dateOfBirth')?.patchValue(dateOfBirth);
    }
  }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    username: ['', [Validators.required, Validators.maxLength(200)]],
    about: ['', Validators.maxLength(256)],
    dateOfBirth: new FormControl(new Date(), [Validators.required]),
  });


  editUser() {
    if (!this.userData.user)
      return;

    const formData = this.profileForm.value;
    const { email, username, dateOfBirth, about } = formData;

    const updatedUserData: User = {
      ...this.userData.user,
      email: email || this.userData.user.email,
      userName: username || this.userData.user.userName,
      dateOfBirth: dateOfBirth instanceof Date ? this.transformDate(dateOfBirth) : this.userData.user.dateOfBirth,
      about: about || this.userData.user.about
    };

    this.userProfileService.editUser(updatedUserData).subscribe({
      next: () => {
        this.onNoClick();
      },
      error: (error) => {
        this.errors = error.errors;
        this.showErrorsToast();
      }
    });
  }

  showErrorsToast() {
    if (this.errors && this.errors.length > 0) {
      const errorMessage = this.errors.join('<br>');
      this.toastr.error(errorMessage, 'Error');
    }
  }


  onNoClick(): void {
    this.userData.reloadCallback();
    this.dialogRef.close();
  }

  transformDate(value: Date): string {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
