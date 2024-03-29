import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private LS_JWT_TOKEN = "LS_JWT_TOKEN"
  public static LS_USER_NAME = "LS_USER_NAME"
  public static LS_USER_EMAIL = "LS_USER_EMAIL"

  setJwtToken(jwtToken?: string) {
    if (jwtToken == null)
      localStorage.removeItem(this.LS_JWT_TOKEN)
    else
      localStorage.setItem(this.LS_JWT_TOKEN, jwtToken)
  }

  getJwtToken() {
    return localStorage.getItem(this.LS_JWT_TOKEN)
  }

  // return bool for jwt valid or not
  isJwtValid() {
      let jwt = this.getJwtToken()

      // TODO: check expiry as well
      return jwt != null
  }
}