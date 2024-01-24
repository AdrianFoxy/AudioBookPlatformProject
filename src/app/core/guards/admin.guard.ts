import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const adminGuard = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
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

