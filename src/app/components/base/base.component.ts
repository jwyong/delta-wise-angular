import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { HttpService } from 'src/app/services/http-service';
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
    let result = await this.httpService.httpPost<T>(endpoint, body, shouldHideErrors)

    // show error snackbar if failed
    if (!result.status && result.message != null)
      this.showSnackbar(result.message)

    return result;
  }

  async httpGet(endpoint: string) {
    this.httpService.httpGet(endpoint)
  }
}
