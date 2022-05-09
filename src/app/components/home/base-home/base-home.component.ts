import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from 'src/app/utils/router_constants';

@Component({
  selector: 'app-base-home',
  templateUrl: './base-home.component.html',
  styleUrls: ['./base-home.component.css']
})

/**
 * base component for home (after logging in)
 * - check jwt validity and re-direct to login if invalid/expired
 */
export class BaseHomeComponent extends BaseComponent implements OnInit {
  override ngOnInit(): void {
    // check if jwt is available/valid
    const jwtToken = this.getJwtFromLocalStorage()

    console.log(`jwtToken = ${jwtToken}`)

    if (jwtToken == null)
      // TODO: check if null or expired
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)

    // get user profile
  }
}
