import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EnumModules } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';

/**
 * main page for auth module
 * - holds router outlet for login, forgot pword and reset pword modules
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent implements OnInit {
  // redirect to home if user already logged in
  override ngOnInit(): void {
    this.redirectJwtValid()
  }

  /**
   * tooltip for pword validation (reset-pword module)
   **/
  shouldShowTooltip() {
    return this.getNestedRouterData('module') == EnumModules.resetPword
  }
  getPwordTooltipText() {
    return $localize`:@@vld_pword_rule:${EWStrings.VAL_PWORD_RULE}`
  }


  // get card title based on module
  getCardTitle() {
    switch (this.getNestedRouterData('module')) {
      case EnumModules.login:
        return EWStrings.VAL_LOGIN

      case EnumModules.forgotPword:
        return EWStrings.VAL_FORGOT_PWORD

      case EnumModules.resetPword:
        return EWStrings.VAL_RESET_PWORD

      default:
        return ""
    }
  }

  getCardSubTitle() {
    switch (this.getNestedRouterData('module')) {
      case EnumModules.login:
        return EWStrings.VAL_LOGIN_SUBTITLE

      case EnumModules.forgotPword:
        return EWStrings.VAL_FORGOT_PWORD_SUBTITLE

      case EnumModules.resetPword:
        return EWStrings.VAL_RESET_PWORD_SUBTITLE

      default:
        return ""
    }
  }
}
