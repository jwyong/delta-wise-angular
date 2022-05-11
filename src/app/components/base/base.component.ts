import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { RouterConstants } from 'src/app/utils/router_constants';
import { HttpClient } from '@angular/common/http';

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
    private router: Router,
    private dataService: DataService,
    public http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  setIsLoading(isLoading: boolean) {
    this.dataService.setIsLoading(isLoading)
  }

  //=== for jwt
  private LS_JWT_TOKEN = "LS_JWT_TOKEN"

  // check if jwt is expired then redirect to login if necessary
  checkJwtExpired() {
    const jwtToken = this.getJwtFromLocalStorage()

    console.log(`checkJwtExpired, jwtToken = ${jwtToken}`)

    if (jwtToken == null)
      // TODO: check if null or expired
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
  }

  // check if jwt is valid and redirect to home if necessary
  checkJwtValid() {
    const jwtToken = this.getJwtFromLocalStorage()

    console.log(`checkJwtValid, jwtToken = ${jwtToken}`)

    if (jwtToken != null)
      // TODO: check if null or expired
      this.navigateTo(RouterConstants.ROUTER_PATH_HOME)
  }

  setJwtToLocalStorage(jwtToken?: string) {
    if (jwtToken == null)
      localStorage.removeItem(this.LS_JWT_TOKEN)
    else
      localStorage.setItem(this.LS_JWT_TOKEN, jwtToken)
  }

  getJwtFromLocalStorage() {
    return localStorage.getItem(this.LS_JWT_TOKEN)
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
}
