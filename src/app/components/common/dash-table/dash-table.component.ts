import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON_STR } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { RouterConstants } from 'src/app/utils/router-constants';

/**
 * table for module dashboard (e.g. full list of commodities/crypto)
 */
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
      return `${COMMON_STR.estimates.constants.table.data_cell_base_class} ${COMMON_STR.estimates.constants.table.highlight_class}`
    else return COMMON_STR.estimates.constants.table.data_cell_base_class
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
