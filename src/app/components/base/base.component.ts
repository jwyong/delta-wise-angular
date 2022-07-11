import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { filter } from 'rxjs';
import { Resp } from 'src/app/models/common/resp';
import { DataService } from 'src/app/services/data-service';
import { HttpService } from 'src/app/services/http-service';
import { EWStrings } from 'src/app/utils/ew-strings';
import { RouterConstants } from 'src/app/utils/router-constants';
import { LocalStorageService } from './../../services/local-storage-service';
import { EnumModules } from './../../utils/ew-constants';

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

  isLoading() {
    return this.dataService.isLoadingSource.value == true
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
    switch (this.getRouterData('module')) {
      case EnumModules.commodities:
        return EWStrings.VAL_COMMODITIES

      case EnumModules.crypto:
        return EWStrings.VAL_CRYPTOS

      default:
        return EWStrings.VAL_EQUITIES
    }
  }

  getSeparator() {
    if (this.route.snapshot.firstChild?.data['subTitle'] == null) return ""
    else return " > "
  }

  getRouterSubtitle() {
    return this.route.snapshot.firstChild?.data['subTitle']
  }

  // get data injected to router
  getRouterData(id: string) {
    return this.route.snapshot.data[id]
  }

  // get data injected to nested route
  getNestedRouterData(id: string) {
    return this.route.firstChild?.snapshot.data[id]
  }

  // get data from router param (e.g. /details/ticker)
  getRouterParam(id: string) {
    return this.route.firstChild?.snapshot.paramMap.get(id)
  }

  /**
   * http calls
   */
  async httpPost<T>(
    endpoint: string, body: any, shouldShowErrors: boolean = true
  ) {
    let result = await this.httpService.httpPost<T>(endpoint, body)

    // handle resp error
    this.handleRespError(result, shouldShowErrors)

    return result;
  }

  async httpGet(endpoint: string) {
    this.httpService.httpGet(endpoint)
  }

  // handle http resp error
  private handleRespError(result: Resp<any>, shouldShowErrors: boolean) {
    if (!result.status)
      // show logout dialog if token expired
      if (result.errors?.includes("Your token is not valid")) {
        alert(EWStrings.VAL_HTTP_TOKEN_EXPIRED)
        this.logout()
      } else
        // show snackbar for normal errors if should show
        if (shouldShowErrors && result.message != null)
          this.showSnackbar(result.message)
  }

  /**
   * logout
   */
  // delete jwt from ls then navigate to main page
  // TODO: add http logout query when BE ready
  logout() {
    // delete jwtToken from ls
    this.localStorageService.setJwtToken()

    // refresh page
    this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
  }
}
