import { RouterConstants } from 'src/app/utils/router-constants';
import { BaseHomeComponent } from './../base-home/base-home.component';
import { AUTH_STR } from 'src/app/constants/auth-strings';
import { Component, OnInit } from '@angular/core';
import { COMMON_STR } from 'src/app/constants/common-strings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseHomeComponent implements OnInit {

  settingsStr = COMMON_STR.settings

  profileStr = COMMON_STR.user_profile
  profilePath = RouterConstants.ROUTER_PATH_UESR_PROFILE

  changePwordTitleStr = AUTH_STR.change_pword.title
  changePwordPath = RouterConstants.ROUTER_PATH_CHANGE_PWORD

  /**
   * ui
   */
  getSettingsTitleClass(href: string): string {
    if (this.router.url.includes(href))
      return "text-black"
    else
      return "text-secondary"
  }

  // navigate to settings > xxx accordingly
  listItemOnClick(path: string) {
    this.navigateTo(path)
  }
}
