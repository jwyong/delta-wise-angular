import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { User } from '../../../models/build-detail';

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
  // user profile
  user = <User>{}

  override ngOnInit(): void {
    console.log("base home comp")
    
    // jwt check
    this.checkJwtExpired()

    // get user profile
    this.getUser()
  }

  //=== user related
  // get user object from api (update avatar based on userName)
  getUser() {
    // TODO: TEMP - hardcoded
    setTimeout(() => {
      let hardCodedUserName = " User Name"
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
    console.log(nameArray)

    switch (true) {
      case nameArray.length == 0:
        userName = ""
        break

      case nameArray.length == 1:
        userName = nameArray[0].charAt(0) ?? userName
        break

      default:
        userName = nameArray[0].charAt(0)
    }

      // const initials = (fullName?.shift()?.charAt(0) ?? "" + fullName?.pop()?.charAt(0)) ?? userName;

      return userName.toUpperCase();
  }
}
