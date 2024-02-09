import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/core/services/dark-mode.service';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors: string[] | null = null;
  constructor(private fb: FormBuilder, private accountService: AccountService,
    private router: Router, public darkmodeService: DarkModeService,
    private dateAdapter: DateAdapter<Date>, public langService: LanguageService){
      if(langService.whatCurrentLang() == 'en-US'){
        this.dateAdapter.setLocale('en-US');
      } else {
        this.dateAdapter.setLocale('uk-UA');
      }
    }

  complexPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{\":;'?/>,.<,])(?!.*\\s).*$"

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)], [this.validateEmailNotTaken()]],
    username: ['', [Validators.required, Validators.maxLength(200)], [this.validateUserNameNotTaken()]],
    dateOfBirth: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)], [this.validatePasswordMatch()]],
    confirmPassword: ['', [Validators.required], [this.validatePasswordMatch()]]
  }
  );


  onSubmit(){
    let date = this.registerForm.value.dateOfBirth;
    if(date) this.registerForm.value.dateOfBirth = this.transformDate(date)

    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/library'),
      error: error => this.errors = error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn{
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true}: null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }

  validateUserNameNotTaken(): AsyncValidatorFn{
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkUserNameExists(control.value).pipe(
            map(result => result ? {usernameExists: true}: null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }

  validatePasswordMatch(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const password = this.registerForm.get('password');
      const confirmPassword = control.value;

      if (password && password.value !== confirmPassword) {
        return Promise.resolve({ passwordMismatch: true });
      } else {
        return Promise.resolve(null);
      }
    }
  }

  transformDate(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
