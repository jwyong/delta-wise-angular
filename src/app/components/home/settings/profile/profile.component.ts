import { BaseHomeComponent } from './../../base-home/base-home.component';
import { COMMON_STR } from 'src/app/constants/common-strings';
import { AUTH_STR } from 'src/app/constants/auth-strings';
import { SettingsComponent } from './../settings.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { User } from 'src/app/models/common/user';
import { LocalStorageService } from 'src/app/services/local-storage-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends SettingsComponent implements OnInit {
  formGrp: FormGroup = new FormGroup({});

  // username validator
  usernameFC = new FormControl('', [Validators.required]);

  // strings
  updateStr = COMMON_STR.confirmation.update
  authStr = AUTH_STR.common
  usernameStr = COMMON_STR.user_name

  user = <User>{}

  override ngOnInit(): void {
    this.getUser()
    
    this.formGrp = new FormGroup({
      username: this.usernameFC,
    });

    this.usernameFC.patchValue(this.user.user_name)
  }

  // get user object from local storage
  getUser() {
    this.user = {
      user_name: localStorage.getItem(LocalStorageService.LS_USER_NAME) ?? "",
      email: localStorage.getItem(LocalStorageService.LS_USER_EMAIL) ?? "",
    }
  }

  getUsernameErrorMsg(formControl: FormControl) {
    if (formControl.hasError(VALIDATION_STR.keys.required)) {
      return VALIDATION_STR.validation.required
    }

    return '';
  }

  isUpdateBtnDisabled() {
    return this.formGrp.invalid || this.usernameFC.value.trim() == this.user.user_name
  }

  updateProfileOnSubmit() {
    if (this.formGrp.invalid) return

    this.showSnackbar("updateProfileOnSubmit")
  }
}
