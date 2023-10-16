import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }
}
