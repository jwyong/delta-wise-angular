import { HttpConstants } from './../utils/http-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable()

export class HttpService {
    constructor(public httpClient: HttpClient) { }
}