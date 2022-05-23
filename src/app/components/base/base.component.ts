import { Resp } from './../../models/resp';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { DataService } from 'src/app/services/data-service';
import { HttpService } from 'src/app/services/http-service';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';
import { LocalStorageService } from './../../services/local-storage-service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

/**
 * base component for everything
 * - all shared funcs e.g. loading, show snackbar, etc here
 */
export class BaseComponent implements OnInit {
  constructor(
    protected router: Router,
    protected dataService: DataService,
    protected localStorageService: LocalStorageService,
    protected _snackBar: MatSnackBar,
    protected httpService: HttpService
  ) { }

  ngOnInit(): void { }

  setIsLoading(isLoading: boolean) {
    this.dataService.setIsLoading(isLoading)
  }

  // check if jwt is expired then redirect to login if necessary
  redirectJwtExpired() {
    if (!this.localStorageService.isJwtValid())
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
  }

  // check if jwt is valid and redirect to home if necessary
  redirectJwtValid() {
    if (this.localStorageService.isJwtValid())
      this.navigateTo(RouterConstants.ROUTER_PATH_HOME)
  }

  // show snackbar
  showSnackbar(msgStr: string, actionStr?: string, action?: () => void, durationInSecs?: number) {
    this._snackBar.open(msgStr, actionStr ?? "", {
      duration: durationInSecs ?? 3 * 1000
    }).afterDismissed().subscribe(() => {
      action
    })
  }

  // navigate router to link
  navigateTo(routerLink: string) {
    this.router.navigate([routerLink])
  }

  /**
   * http calls
   */
  async httpPost<T>(
    endpoint: string, body: any, shouldHideErrors?: boolean
  ) {
    let fullURL = HttpConstants.HTTP_BASE_URL + endpoint;
    let json = JSON.stringify(body);

    // do sync http post
    var resp = <Resp<T>>{}
    await firstValueFrom(this.httpService.httpClient.post<T>(fullURL, json))
      .then((data) => {
        resp = {
          success: true,
          data: data
        }
      })
      .catch((error) => {
        // show snackbar error if need
        if (shouldHideErrors != true)
          this.showSnackbar(error.message)

        resp = {
          success: false,
          error: error,
        };
      });

    return resp;
  }

  async httpGet(endpoint: string) {
    let fullURL = HttpConstants.HTTP_BASE_URL + endpoint;

    return await firstValueFrom(this.httpService.httpClient.get(fullURL))
  }
}
