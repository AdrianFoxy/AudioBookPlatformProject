import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subject, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service/loader.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loaderName: string;
    let loaderSubject: Subject<boolean>;
    let delayDuration: number | undefined;

    if (request.url.includes('/Auth/emailexists') || request.url.includes('/Auth/usernameexists')) {
      loaderName = 'isLoading (Auth/emailexists)';
      loaderSubject = this.loaderService.isLoading;
      delayDuration = 1000;
    } else if (request.url.includes('/Recommendation')) {
      loaderName = 'isLoadingRecommendation';
      loaderSubject = this.loaderService.isLoadingRecommendation;
    } else if(request.url.includes('UserLibrary')){
      loaderName = 'UserLibraryBooks';
      loaderSubject = this.loaderService.isLoadingUserLibrary;
      delayDuration = 500;
    }
    else {
      loaderName = 'isLoading (default)';
      loaderSubject = this.loaderService.isLoading;
    }

    // console.log(`Loader: ${loaderName}`);

    return this.handleRequest(request, next, loaderSubject, delayDuration);
  }

  private handleRequest(request: HttpRequest<unknown>, next: HttpHandler, loaderSubject: Subject<boolean>, delayDuration: number | undefined): Observable<HttpEvent<unknown>> {
    loaderSubject.next(true);

    return next.handle(request).pipe(
      delay(delayDuration || 0),
      finalize(() => {
        loaderSubject.next(false);
        // console.log(`Loader ${loaderSubject === this.loaderService.isLoading ? 'isLoading' : 'isLoadingRecommendation'} turned off`);
      })
    );
  }
}
