import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { LocalStorageService } from 'src/app/services/local-storage-service';
// import { DataService } from 'src/app/services/data-service';
// import { HttpService } from 'src/app/services/http-service';
// import { GlobalConstants } from 'src/app/utils/global-constants';
// import { StringsEng } from 'src/app/utils/strings-en';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // constructor(
  //   private formBuilder: FormBuilder,
  //   // private httpService: HttpService,
  //   // private dataService: DataService,
  //   // private localStorageService: LocalStorageService,
  //   private router: Router
  // ) {
    // this.loginForm = this.formBuilder.group({
    //   client_id: GlobalConstants.XMPP_CLIENT_ID,
    //   client_secret: GlobalConstants.XMPP_CLIENT_SECRET,
    //   email: '',
    //   password: '',
    // });

    // this.regForm = this.formBuilder.group({
    //   client_id: GlobalConstants.XMPP_CLIENT_ID,
    //   client_secret: GlobalConstants.XMPP_CLIENT_SECRET,
    //   email: '',
    //   password: '',
    // });
  // }

  // loginForm;
  // regForm;
  // shouldShowPword = false;

  // ngOnInit(): void {
    // redirect to homepage if got access token already
    // if (this.localStorageService.getAccessToken() != null)
    //   this.router.navigate(['/']);
  // }

  // async loginFormOnSubmit(formBody) {
  //   this.dataService.setIsLoading(true);

  //   let resp = await this.httpService.httpPostNoHeader(
  //     GlobalConstants.HTTP_LOGIN_URL,
  //     formBody
  //   );

  //   // save access token then navigate to home
  //   if (resp.success) {
  //     this.localStorageService.storeValueToLocalStorage(
  //       GlobalConstants.LS_KEY_ACCESS_TOKEN,
  //       resp.data.access_token
  //     );

  //     // set first project in list as project id
  //     let firstProject = resp.data.project_list[0] as Project;

  //     this.dataService.setCurrentProject(firstProject, false);

  //     window.location.href = '/';
  //   } else {
  //     this.dataService.setIsLoading(false);
  //   }
  // }

  // toggleShowPword() {
  //   this.shouldShowPword = !this.shouldShowPword;
  // }

  // async regFormOnSubmit(formBody) {
  //   this.dataService.setIsLoading(true);

  //   let resp = await this.httpService.httpPostNoHeader(
  //     GlobalConstants.HTTP_REG_URL,
  //     formBody
  //   );

  //   this.dataService.setIsLoading(false);

  //   // show dialog if successful
  //   if (resp.success) {
  //     alert(StringsEng.REG_SUCCESS);
  //     location.reload();
  //   }
  // }
}
