import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> => {
    return this.accountService.currentUser$.pipe(
      map((auth) => {
        if (auth) {
          return true; // Allow navigation if user is authenticated
        } else {
          // Redirect to login if not authenticated
          return this.router.createUrlTree(['/account/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  };
}
