import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()

export class HttpService {
    constructor(public httpClient: HttpClient) { }
}