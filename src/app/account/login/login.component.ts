import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from 'src/app/core/services/dark-mode-service/dark-mode.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public darkmodeService: DarkModeService, private accountService: AccountService,
    private router: Router) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => this.router.navigateByUrl('library')
    })
  }
}
