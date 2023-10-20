import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service/loader.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);

    if (request.url.includes('/Auth/emailexists')) {
      return next.handle(request).pipe(
        delay(1000),
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
    }
  }
}
