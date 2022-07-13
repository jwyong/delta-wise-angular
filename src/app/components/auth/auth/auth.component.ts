import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { AUTH_STR } from '../../../constants/auth-strings';

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
    return VALIDATION_STR.rules.pword
  }


  // get card title based on module
  getCardTitle() {
    switch (this.getNestedRouterData('module')) {
      case EnumModules.login:
        return AUTH_STR.login.title

      case EnumModules.forgotPword:
        return AUTH_STR.forgot_pword.title

      case EnumModules.resetPword:
        return AUTH_STR.reset_pword.title

      default:
        return ""
    }
  }

  getCardSubTitle() {
    switch (this.getNestedRouterData('module')) {
      case EnumModules.login:
        return AUTH_STR.login.subTitle

      case EnumModules.forgotPword:
        return AUTH_STR.forgot_pword.subTitle

      case EnumModules.resetPword:
        return AUTH_STR.reset_pword.subTitle

      default:
        return ""
    }
  }
}
