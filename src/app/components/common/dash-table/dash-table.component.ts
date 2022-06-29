import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commodity } from 'src/app/models/commodities/commodity';
import { Cryptocurrency } from 'src/app/models/crypto/crypto';
import { EnumModules, EWConstants } from 'src/app/utils/ew-constants';
import { RouterConstants } from 'src/app/utils/router-constants';

@Component({
  selector: 'app-dash-table',
  templateUrl: './dash-table.component.html',
  styleUrls: ['./dash-table.component.css']
})
export class DashTableComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  @Input()
  displayedColumns: string[] = []

  @Input()
  displayedData: any[] = []

  @Input() getHumanisedHeaderCellValue: ((item: any) => string) = (item: any): string => {
    return item
  };

  /**
* table highlighting related
*/
  // for highglighting row/col header on mouseover
  mouseOverItem?: any

  // update which row/col is mouse-over now
  cellOnMouseOver(item: any) {
    this.mouseOverItem = item
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(item: any) {
    // data columns - use data col css
    if (item == this.mouseOverItem)
      return `${EWConstants.EST_TBL_DATA_CELL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
    else return EWConstants.EST_TBL_DATA_CELL_BC
  }

  // navigate to commodity detail
  itemOnClick(item: any) {
    // TODO: TEMP - set obj to ls for non-equities (hardcoded without http)
    let module = this.route.snapshot.data['module']
    
    switch (module) {
      case EnumModules.commodities:
        localStorage.setItem("commodity", JSON.stringify(item))
        break

      case EnumModules.crypto:
        localStorage.setItem("crypto", JSON.stringify(item))
        break
    }

    this.router.navigate([`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`], { relativeTo: this.route, })
  }

}
