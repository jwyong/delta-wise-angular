import { DataService } from 'src/app/services/data-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    // private localStorageService: LocalStorageService,
    private router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  setIsLoading(isLoading: boolean) {
    this.dataService.setIsLoading(isLoading)
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
