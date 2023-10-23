import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(){
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.get<User>(this.baseUrl + 'Auth/get-current-user',  { headers: header, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  login(values: any) {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<User>(this.baseUrl + 'Auth/login', values, { headers: header, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  register(values: any){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<User>(this.baseUrl + 'Auth/register', values, { headers: header, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  logout() {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    this.revokeToken().subscribe(() => {
      this.http.delete(this.baseUrl + 'Auth/logout', { headers: header, withCredentials: true })
        .subscribe(() => {
          this.currentUserSource.next(null);
          this.router.navigateByUrl('/');
        });
    });
  }

  checkEmailExists(email: string){
    return this.http.get<boolean>(this.baseUrl + 'Auth/emailexists?email=' + email);
  }

  checkUserNameExists(username: string){
    return this.http.get<boolean>(this.baseUrl + 'Auth/usernameexists?username=' + username);
  }

  refreshToken(): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get(this.baseUrl + "Auth/refreshToken", { headers: header, withCredentials: true });
  }

  revokeToken(): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + "Auth/revokeToken", { headers: header, withCredentials: true });
  }

}
