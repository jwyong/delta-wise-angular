import { EWConstants } from './../../../utils/ew-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }

  appVersion = EWConstants.APP_VERSION

  ngOnInit(): void {
  }
}
