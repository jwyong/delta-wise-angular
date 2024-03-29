import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { environment } from 'src/environments/environment';
import { Resp } from '../models/common/resp';
import { HttpConstants } from '../utils/http-constants';

@Injectable()

export class HttpService {
    constructor(public httpClient: HttpClient) { }

    async httpPost<T>(
        endpoint: string, body: any
    ) {
        let fullURL = `${environment.apiUrl}/${HttpConstants.HTTP_API_VERSION}/${endpoint}`
        let json = JSON.stringify(body);

        console.log("httpPost bodyJson = ", json)

        // do sync http post
        var resp = <Resp<T>>{}
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        await firstValueFrom(this.httpClient.post<T>(fullURL, json, { headers: headers }))
            .then((data) => {
                console.log("httpPost success: data = ", data)
                resp = data
            })
            .catch((error) => {
                console.log("httpPost, error = ", error)

                // add error msg to resp obj
                let errorObj = error.error

                // check for errors array from BE
                let errorsArray: string[] = errorObj.errors

                var msg: string = ''
                if (errorsArray != null) {
                    // use BE message if got
                    msg = errorObj.message

                    // append first error to msg string if got
                    if (errorsArray.length > 0)
                        msg = `${msg} (${errorsArray[0]})`
                } else
                    // use http message if nothing from BE
                    msg = error.message

                resp = error.error
                resp.message = msg
            });

        return resp;
    }
}