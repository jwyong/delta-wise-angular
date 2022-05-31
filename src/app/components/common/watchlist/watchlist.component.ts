import { EWStrings } from 'src/app/utils/ew-strings';
import { Watchlist } from './../../../models/watchlist';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  isEditMode = false
  watchlists: Watchlist[] = [
    {id: "1", name: 'apple'},
    {id: "2", name: 'banana'},
    {id: "3", name: 'strawberry'},
    {id: "4", name: 'orange'},
    {id: "5", name: 'kiwi'},
    {id: "6", name: 'cherry'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // chipOnClick: get whatchlist from api
  chipOnClick(watchlist: Watchlist) {
    console.log("chipOnClick, wl = ", watchlist)
  }

  // remove chip btn: confirm then remove chip on UI + api
  removeChipOnClick(watchlist: Watchlist): void {
    if (confirm(EWStrings.deleteWatchlist(watchlist.name))) {
      const index = this.watchlists.indexOf(watchlist);

      if (index >= 0) {
        this.watchlists.splice(index, 1);
      }
    }
  }
}
