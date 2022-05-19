import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        // const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (this.localStorageService.isJwtValid()) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.localStorageService.getJwtToken}` }
            });
        }

        return next.handle(request);
    }
}
