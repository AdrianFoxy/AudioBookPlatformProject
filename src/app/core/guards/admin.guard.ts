import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const adminGuard = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    filter(currentUser => currentUser !== null),
    take(1),
    map(currentUser => {
      if (currentUser?.role === 'Admin') {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    })
  );
};

