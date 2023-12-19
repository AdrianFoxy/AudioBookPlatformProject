import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  // REWORK ME LATER, PLS
  constructor(public dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder, private userProfileService: UserProfileService) {
  }

  errors: string[] | null = null;

  ngOnInit(): void {
    if (this.userData) {
      const dateOfBirth = new Date(this.userData.dateOfBirth);
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
    if (!this.userData)
      return;

    const formData = this.profileForm.value;
    const { email, username, dateOfBirth, about } = formData;

    if (email)
      this.userData.email = email;
    if (username)
      this.userData.userName = username;
    if (dateOfBirth instanceof Date)
      this.userData.dateOfBirth = this.transformDate(dateOfBirth);
    if (about)
      this.userData.about = about;

    this.userProfileService.editUser(this.userData).subscribe({
      next: () => this.onNoClick(),
      error: (error) => (this.errors = error.errors)
    });
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
