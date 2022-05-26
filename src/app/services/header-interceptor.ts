import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        let jwt = this.localStorageService.getJwtToken()?.toString()?? ""
        console.log(`intercept, jwt = ${jwt}`)

        if (this.localStorageService.isJwtValid() && isApiUrl) {
            // TODO: add time zone to header (e.g. "+8", "-7")

            request = request.clone({
                setHeaders: { Authorization: jwt}
            });
        }

        return next.handle(request);
    }
}
