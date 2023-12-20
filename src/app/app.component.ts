import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ABP_Client_Re';

  private baseUrl = environment.apiUrl

  constructor(private accountService: AccountService){

  }
  ngOnInit(): void {
    console.log('HELLO WORLD' + this.baseUrl);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    console.log('User load try in component');
    this.accountService.loadCurrentUser().subscribe();
  }
}
