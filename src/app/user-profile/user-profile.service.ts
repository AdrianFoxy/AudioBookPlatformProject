import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private accountService: AccountService) { }

  editUser(user: User){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.put<User>(this.baseUrl + 'UserProfile/' + user.id, user, { headers: header, withCredentials: true })
    .pipe(
      switchMap(() => this.accountService.loadCurrentUser())
    );
  }
}
