import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private getLang(): string {
    return localStorage.getItem('lang') || 'en-US';
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', this.getLang());
  }

  loadCurrentUser(){
    const headers = this.createHeaders();
    return this.http.get<User>(this.baseUrl + 'Auth/get-current-user',  { headers: headers, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  login(values: any) {
    const headers = this.createHeaders();
    return this.http.post<User>(this.baseUrl + 'Auth/login', values, { headers: headers, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  register(values: any){
    const headers = this.createHeaders();
    return this.http.post<User>(this.baseUrl + 'Auth/register', values, { headers: headers, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<User>(this.baseUrl + "Auth/loginWithGoogle", JSON.stringify(credentials), { headers: headers, withCredentials: true }).pipe(
      map(user => {
        this.currentUserSource.next(user);
      })
    )
  }

  logout() {
    const headers = this.createHeaders();
    this.revokeToken().subscribe(() => {
      this.http.delete(this.baseUrl + 'Auth/logout', { headers: headers, withCredentials: true })
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
    const headers = this.createHeaders();
    return this.http.get(this.baseUrl + "Auth/refreshToken", { headers: headers, withCredentials: true });
  }

  revokeToken(): Observable<any> {
    const headers = this.createHeaders();
    return this.currentUser$.pipe(
      take(1),
      switchMap(currentUser => {
        const username = currentUser?.userName || '';
        return this.http.delete(this.baseUrl + "Auth/revokeToken?username=" + username, { headers: headers, withCredentials: true });
      })
    );
  }
}
