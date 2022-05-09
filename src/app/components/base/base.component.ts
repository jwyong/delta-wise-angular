import { DataService } from 'src/app/services/data-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Observer } from 'rxjs';
import { RouterConstants } from 'src/app/utils/router_constants';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  setIsLoading(isLoading: boolean) {
    this.dataService.setIsLoading(isLoading)
  }

  //=== for jwt
  private LS_JWT_TOKEN = "LS_JWT_TOKEN"

  setJwtToLocalStorage(jwtToken: string) {
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
