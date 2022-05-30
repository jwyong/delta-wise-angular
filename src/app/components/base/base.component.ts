import { Resp } from './../../models/resp';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { DataService } from 'src/app/services/data-service';
import { HttpService } from 'src/app/services/http-service';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';
import { LocalStorageService } from './../../services/local-storage-service';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { LoginResp } from 'src/app/models/auth/login-resp';

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
    protected route: ActivatedRoute,
    protected dataService: DataService,
    protected localStorageService: LocalStorageService,
    protected _snackBar: MatSnackBar,
    protected httpService: HttpService,
    protected dialog: MatDialog
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

  /**
   * router related
   */
  // navigate router to link
  navigateTo(routerLink: string) {
    this.router.navigate([routerLink], { relativeTo: this.route, })
  }

  // get full title for router (e.g. Equities > Details)
  getRouterTitle() {
    return this.route.snapshot.data['title']
  }

  getSeparator() {
    if (this.route.snapshot.firstChild?.data['subTitle'] == null) return ""
    else return " > "
  }

  getRouterSubtitle() {
    return this.route.snapshot.firstChild?.data['subTitle']
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
    var resp = <Resp<LoginResp>>{}
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    await firstValueFrom(this.httpService.httpClient.post<T>(fullURL, json, { headers: headers }))
      .then((data) => {
        console.log("httpPost success: data = ", data)
        resp = data
      })
      .catch((error) => {
        console.log("httpPost, error = ", error)

        // show snackbar error if need
        if (shouldHideErrors != true) {
          var msg: string

          let errorObj = error.error

          // check for errors array from BE
          let errorsArray: string[] = errorObj.errors

          if (errorsArray != null) {
            // use BE message if got
            msg = errorObj.message

            // append first error to msg string if got
            if (errorsArray.length > 0)
              msg = `${msg} (${errorsArray[0]})`
          } else
            // use http message if nothing from BE
            msg = error.message

          this.showSnackbar(msg)
        }

        resp = error.error
      });

    return resp;
  }

  async httpGet(endpoint: string) {
    let fullURL = HttpConstants.HTTP_BASE_URL + endpoint;

    return await firstValueFrom(this.httpService.httpClient.get(fullURL))
  }
}
