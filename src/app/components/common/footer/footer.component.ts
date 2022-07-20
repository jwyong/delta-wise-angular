import { COMMON_STR } from 'src/app/constants/common-strings';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  touStr = COMMON_STR.terms_of_use
  
  constructor() { }

  appVersion = environment.version

  ngOnInit(): void {
    console.log(this.appVersion)
  }
}
