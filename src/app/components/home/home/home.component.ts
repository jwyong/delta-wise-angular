import { Crypto } from './../../../models/crypto';
import { RouterConstants } from '../../../utils/router-constants';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { User } from '../../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * base component for home (after logging in)
 * - check jwt validity and re-direct to login if invalid/expired
 */
export class HomeComponent extends BaseComponent implements OnInit {
  // router path for html
  equitiesPath = RouterConstants.ROUTER_PATH_EQUITIES
  commoditiesPath = RouterConstants.ROUTER_PATH_COMMODITIES
  cryptoPath = RouterConstants.ROUTER_PATH_CRYPTO

  // user obj
  user = <User>{}

  override ngOnInit(): void {
    console.log("home init")

    // redirect to login if user not logged in/jwt expired
    this.redirectJwtExpired()

    // get user profile
    this.getUser()
  }

  /**
   * router link related
   */
  getToolbarTitleClass(href: string): string {
    if (this.router.url.includes(href))
      return "text-primary"
    else
      return ""
  }

  /**
   * user related
   */
  // get user object from api (update avatar based on userName)
  getUser() {
    // TODO: TEMP - hardcoded
    setTimeout(() => {
      let hardCodedUserName = "Hardcoded User Name"
      let avatar = this.getInitials(hardCodedUserName)

      this.user = {
        user_name: hardCodedUserName,
        avatar: avatar
      }
    }, 1000);
  }

  getInitials(userName: string) {
    const nameArray = userName.split(' ').filter(element => {
      return element !== '';
    }) ?? [];

    switch (true) {
      // no username - just return empty
      case nameArray.length == 0:
        userName = ""
        break

      // 1 name only - use that initial
      case nameArray.length == 1:
        userName = nameArray[0].charAt(0) ?? userName
        break

      // all others (2 names and above) - use first and last initial
      default:
        userName = nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
    }

    return userName.toUpperCase();
  }

  // 

  //=== logout
  logoutOnClick() {
    this.setIsLoading(true)

    setTimeout(() => {
      // delete jwtToken from ls
      this.localStorageService.setJwtToken()

      // refresh page
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)

      this.setIsLoading(false)
    }, 1000);
  }
}
