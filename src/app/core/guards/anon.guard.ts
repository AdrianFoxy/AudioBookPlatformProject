import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const anonGuard = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  accountService.loadCurrentUser().subscribe();

  return accountService.currentUser$.pipe(
    map(auth => {
      if (auth) {
        router.navigate(['/'], {queryParams: {returnUrl: router.url}});
        return false;
      }
      else {
        return true
      }
    })
  );
};
