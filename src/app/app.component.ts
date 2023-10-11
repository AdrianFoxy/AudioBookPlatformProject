import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private baseUrl = environment.apiUrl

  ngOnInit(): void {
    console.log('HELLO WORLD' + this.baseUrl);
  }
  title = 'ABP_Client_Re';
}
