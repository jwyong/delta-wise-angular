import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

/**
 * base component for home/main page of each module (page with search bar)
 * - holds router link for home modules e.g. equitites, commo, crypto
 * - separated from home component as different modules may have diff search funcs/ui
 */
@Component({
  selector: 'app-base-home',
  templateUrl: './base-home.component.html',
  styleUrls: ['./base-home.component.css']
})
export class BaseModuleComponent extends BaseComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;

  /**
  * search bar UI
  */
  searchBarLabel: string = ''

  clearSearchBar() {
    this.searchBar.searchInput.nativeElement.value = ''
  }
}
