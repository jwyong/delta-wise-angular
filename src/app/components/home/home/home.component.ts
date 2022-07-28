import { BaseHomeComponent } from './../base-home/base-home.component';
import { COMMON_STR } from 'src/app/constants/common-strings';
import { CRYPTO_STR } from './../../../constants/modules/crypto-strings';
import { COMMODITY_STR } from 'src/app/constants/modules/commodity-strings';
import { EQT_STR } from './../../../constants/modules/equities-strings';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { User } from '../../../models/common/user';
import { RouterConstants } from '../../../utils/router-constants';
import { AUTH_STR } from '../../../constants/auth-strings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * home component with toolbar (after logging in)
 * - check jwt validity and re-direct to login if invalid/expired
 */
export class HomeComponent extends BaseHomeComponent implements OnInit {
  eqtPluralStr = EQT_STR.equity.plural
  commoPluralStr = COMMODITY_STR.commodity.plural
  cryptoPluralStr = CRYPTO_STR.crypto.plural
  settingsStr = COMMON_STR.settings
  logoutStr = AUTH_STR.logout.title

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
  // get user object from local storage
  getUser() {
    let userName = localStorage.getItem(LocalStorageService.LS_USER_NAME) ?? ""
    let avatar = this.getInitials(userName)

    this.user = {
      user_name: userName,
      email: localStorage.getItem(LocalStorageService.LS_USER_EMAIL) ?? "",
      avatar: avatar
    }
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

  /**
   * dropdown items onClick
   */
  // settings
  settingsOnClick() {
    this.navigateTo(RouterConstants.ROUTER_PATH_SETTINGS)
  }

  // logout
  logoutOnClick() {
    this.showGenericDialog({
      title: AUTH_STR.logout.title,
      subTitle: AUTH_STR.logout.subTitle,
      positiveBtnFunc: () => this.logout()
    })
  }
}
