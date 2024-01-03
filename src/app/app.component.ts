import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ABP_Client_Re';

  isAdminUrl: boolean = true;
  isContentLoaded: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.checkUrl();
  }

  loadCurrentUser() {
    this.accountService.loadCurrentUser().subscribe();
  }

  checkUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlWithoutParams = this.router.url.split('?')[0];
        this.isAdminUrl = !urlWithoutParams.includes('admin');
        this.isContentLoaded = true;
      }
    });
  }

}
