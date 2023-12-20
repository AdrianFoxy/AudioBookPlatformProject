import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from 'src/app/core/services/dark-mode-service/dark-mode.service';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(public darkmodeService: DarkModeService, private accountService: AccountService,
    private router: Router, private activatedRoute: ActivatedRoute, private _ngZone: NgZone, private el: ElementRef) {
      this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/library';
    }
  private clientId = environment.clientId

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDivGoogle"),
      { theme: "filled_blue" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }


  async handleCredentialResponse(response: CredentialResponse) {
    debugger
    await this.accountService.LoginWithGoogle(response.credential).subscribe(
      (x: any) => {
        this._ngZone.run(() => {
          this.router.navigateByUrl(this.returnUrl)
        })
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => this.router.navigateByUrl(this.returnUrl)
    })
  }
}
