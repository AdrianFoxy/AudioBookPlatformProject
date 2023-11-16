import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { switchMap } from 'rxjs';
import { userLibraryParams } from '../shared/models/audioBooksParams/userLibraryParams';
import { AudioBook } from '../shared/models/audiobook';
import { Pagination } from '../shared/models/pagination';

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

  getUser(username: string){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<User>(this.baseUrl + 'UserProfile/' + username, { headers: header, withCredentials: true });
  }

  getUserLibrary(userLibraryParams: userLibraryParams){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    let params = new HttpParams();
    params = params.append('UserId', userLibraryParams.userId);
    params = params.append('StatusId', userLibraryParams.statusId);
    params = params.append('PageIndex', userLibraryParams.pageNumber);
    params = params.append('PageSize', userLibraryParams.pageSize);

    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'UserLibrary?' + params,
    { headers: header, withCredentials: true });
  }
}
