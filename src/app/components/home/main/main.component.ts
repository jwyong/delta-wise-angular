import { EnumModules } from './../../../utils/ew-constants';
import { BaseComponent } from './../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew-constants';
import { RouterConstants } from 'src/app/utils/router-constants';

/**
 * main landing page for each module after logging in
 * - currently hosts watchlist and recent search
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  module: string = this.getRouterData('module')

  // list item on click - go to detail page
  listItemOnClick(item: any) {
    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`)

    // switch (this.module) {
    //   case EnumModules.equities:
    //     break

    //   case EnumModules.commodities:
    //     this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`)
    //     break

    //   case EnumModules.crypto:
    //     break
    // }
  }
}
