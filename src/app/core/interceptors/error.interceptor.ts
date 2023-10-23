import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService,
              private accountService: AccountService) {}
  ctr = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error) {
          if(error.status === 400){
            if(error.error.errors){
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.status.toString())
            }
          }
          if(error.status === 401){
            if(this.ctr != 1){
              this.ctr++;
              this.accountService.refreshToken().subscribe({
                next: (x: any) =>{
                  this.toastr.error("Token refreshed, try again", error.status.toString());
                },
                error: (err: any) =>{
                  this.accountService.revokeToken().subscribe({
                    next: (x: any) => {
                      this.router.navigateByUrl('/account/login');
                      this.toastr.error("Try to re-login", error.status.toString());
                    }
                  })
                }
              })
            }
            else{
              this.ctr = 0
              this.toastr.error(error.error.message, error.status.toString())
            }
          }
          if(error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if(error.status === 500){
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(error.message))
      })
    )
  }
}
