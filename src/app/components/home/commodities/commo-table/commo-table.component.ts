import { RouterConstants } from './../../../../utils/router-constants';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commodity } from 'src/app/models/commodities/commodity';
import { EWConstants } from 'src/app/utils/ew-constants';

@Component({
  selector: 'app-commo-table',
  templateUrl: './commo-table.component.html',
  styleUrls: ['./commo-table.component.css']
})
export class CommoTableComponent implements OnInit {

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
  mouseOverItem?: Commodity

  // update which row/col is mouse-over now
  cellOnMouseOver(item: Commodity) {
    this.mouseOverItem = item
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(item: Commodity) {
    // data columns - use data col css
    if (item == this.mouseOverItem)
      return `${EWConstants.EST_TBL_DATA_CELL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
    else return EWConstants.EST_TBL_DATA_CELL_BC
  }

  // navigate to commodity detail
  itemOnClick(id: string) {
    this.router.navigate([`${RouterConstants.ROUTER_PATH_DETAILS}/${id}`], { relativeTo: this.route, })
  }
}
