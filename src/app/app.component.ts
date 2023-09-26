import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ABP_Client';
  authors: any[] = [];

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    // this.http.get('https://localhost:7088/api/AudioBook/get-authors').subscribe({
    //   next: (response: any) => console.log(response),
    //   error: error => console.log(error),
    //   complete: () => {
    //     console.log('request completed');
    //     console.log('extra statment');
    //   }
    // })
   }
}
