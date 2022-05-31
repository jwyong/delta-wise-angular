import { Company } from './../../../models/equities/company';
import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';
import { Watchlist } from './../../../models/watchlist';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent extends BaseComponent implements OnInit {
  isEditMode = false
  watchlists: Watchlist[] = [];
  selectedWatchlist = <Watchlist>{}
  isLoadingWatchlist = false

  override ngOnInit(): void {
    this.setIsLoading(true)

    setTimeout(() => {
      this.watchlists = [
        { id: "1", name: 'apple' },
        { id: "2", name: 'banana' },
        { id: "3", name: 'strawberry' },
        { id: "4", name: 'orange' },
        { id: "5", name: 'kiwi' },
        { id: "6", name: 'cherry' },

        { id: "11", name: 'apple' },
        { id: "12", name: 'banana' },
        { id: "13", name: 'strawberry' },
        { id: "14", name: 'orange' },
        { id: "15", name: 'kiwi' },
        { id: "16", name: 'cherry' },
        { id: "21", name: 'apple' },
        { id: "22", name: 'banana' },
        { id: "23", name: 'strawberry' },
        { id: "24", name: 'orange' },
        { id: "25", name: 'kiwi' },
        { id: "26", name: 'cherry' },
        { id: "31", name: 'apple' },
        { id: "32", name: 'banana' },
        { id: "33", name: 'strawberry' },
        { id: "34", name: 'orange' },
        { id: "35", name: 'kiwi' },
        { id: "36", name: 'cherry' },
      ]

      // simulate click on first list
      this.chipOnClick(this.watchlists[0])

      this.setIsLoading(false)
    }, 1000);
  }

  // chipOnClick: get whatchlist from api
  chipOnClick(watchlist: Watchlist) {
    console.log("chipOnClick, wl = ", watchlist)

    // TODO: TEMP - hardcoded selected watchlist
    this.isLoadingWatchlist = true

    setTimeout(() => {
      this.selectedWatchlist = {
        id: watchlist.id, name: watchlist.name,
        // children: this.getRandomCompanies()
      }
      this.isLoadingWatchlist = false
      this.isEditMode = false
    }, 1000);
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

  // TEMP: generate random items for each watchlist
  randomCompanies: Company[] = [
    { ticker: "DTW3", company: "DELTAWISE 3 PLC" },
    { ticker: "DTW4", company: "DELTAWISE 4 PLC" },
    { ticker: "DTW5", company: "DELTAWISE 5 PLC" },
    { ticker: "DTW6", company: "DELTAWISE 6 PLC" },
    { ticker: "DTW7", company: "DELTAWISE 7 PLC" },
    { ticker: "AZN", company: "ASTRAZENECA PLC" },
    { ticker: "FB", company: "Meta" },
    { ticker: "ABC", company: "Company ABC" },
    { ticker: "TEST", company: "Test Company" },
    { ticker: "DTW1", company: "DELTAWISE 1 PLC" },
    { ticker: "DTW2", company: "DELTAWISE 2 PLC" },
    { ticker: "DTW3", company: "DELTAWISE 3 PLC" },
    { ticker: "DTW4", company: "DELTAWISE 4 PLC" },
    { ticker: "DTW5", company: "DELTAWISE 5 PLC" },
    { ticker: "DTW6", company: "DELTAWISE 6 PLC" },
    { ticker: "DTW7", company: "DELTAWISE 7 PLC" },
    { ticker: "AZN", company: "ASTRAZENECA PLC" },
    { ticker: "FB", company: "Meta" },
    { ticker: "ABC", company: "Company ABC" },
    { ticker: "TEST", company: "Test Company" },
    { ticker: "DTW1", company: "DELTAWISE 1 PLC" },
    { ticker: "DTW2", company: "DELTAWISE 2 PLC" },
    { ticker: "DTW3", company: "DELTAWISE 3 PLC" },
    { ticker: "DTW4", company: "DELTAWISE 4 PLC" },
    { ticker: "DTW5", company: "DELTAWISE 5 PLC" },
    { ticker: "DTW6", company: "DELTAWISE 6 PLC" },
    { ticker: "DTW7", company: "DELTAWISE 7 PLC" },
    { ticker: "AZN", company: "ASTRAZENECA PLC" },
    { ticker: "FB", company: "Meta" },
    { ticker: "ABC", company: "Company ABC" },
    { ticker: "TEST", company: "Test Company" },
    { ticker: "DTW1", company: "DELTAWISE 1 PLC" },
    { ticker: "DTW2", company: "DELTAWISE 2 PLC" },
  ]
  getRandomCompanies(): Company[] {
    return this.randomCompanies.slice(Math.floor(Math.random() * (11 - 3 + 1)) + 3)
  }

  /**
   * ui
   */
  // show edit btn if there are watchlists to edit
  shouldShowWLEditBtn() {
    return this.watchlists.length > 0
  }

  // show watchlists chips if got watchlist + not loading
  shouldShowWatchlists() {
    return !this.isLoading() && this.watchlists.length > 0
  }

  // show watchlist items if got items in selected watchlist + not loading
  shouldShowWLItems() {
    return !this.isLoadingWatchlist && (this.selectedWatchlist.children ?? []).length > 0
  }

  // show empty UX if no watchlists / items in selected watchlist after loading
  shouldShowEmptyUx() {
    return !this.isLoading() && !this.isLoadingWatchlist &&
      (this.watchlists.length == 0 || (this.selectedWatchlist.children ?? []).length == 0)
  }

  /**
   * empty watchlist(s) ux
   */
  isWatchlistsEmpty() {
    return this.watchlists.length == 0
  }

  // click on empty watchlist - either add new watchlist or focus on search bar
  emptyWatchlistOnClick() {
    if (this.isWatchlistsEmpty())
      // watchlist empty - add new watchlist
      console.log("empty")

    else {
      console.log("search")

      // this.searchBar.nativeElement.focus()

    }
  }
}
