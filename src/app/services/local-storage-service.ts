import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private LS_JWT_TOKEN = "LS_JWT_TOKEN"

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