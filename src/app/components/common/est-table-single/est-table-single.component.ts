import { BaseComponent } from 'src/app/components/base/base.component';
import { EWConstants } from 'src/app/utils/ew-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-est-table-single',
  templateUrl: './est-table-single.component.html',
  styleUrls: ['./est-table-single.component.css']
})
export class EstTableSingleComponent extends BaseComponent implements OnInit {
  displayedColumns: any[] = []
  displayedData: any[] = []

  percDiffColName = 'percDiff'

  override ngOnInit(): void {
    // simulate get table data
    this.setIsLoading(true)

    setTimeout(() => {
      this.displayedColumns = [EWConstants.EST_TBL_NAME_COL, this.percDiffColName]
      this.displayedData = []
    }, 800);

    31 May ‘22
30 June ‘22
30 Sept ‘22
31 Dec ‘22
31 March ‘23
31 June ‘23
"31 Sept ’23
"
  }

  /**
  * table highlighting related
  */
  // for highglighting row/col header on mouseover
  mouseOverRowName?: string
  mouseOverColName?: string

  // update which row/col is mouse-over now
  cellOnMouseOver(rowType: string, colName: string) {
    if (colName == EWConstants.EST_TBL_NAME_COL) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != EWConstants.EST_TBL_NAME_COL) {
      // data columns - use data col css
      if (colName == this.mouseOverColName && rowName == this.mouseOverRowName)
        return `${EWConstants.EST_TBL_DATA_CELL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
      else return EWConstants.EST_TBL_DATA_CELL_BC

    } else {
      // first col
      if (rowName == this.mouseOverRowName)
        return `${EWConstants.EST_TBL_DATA_CELL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
      else return EWConstants.EST_TBL_DATA_CELL_BC
    }
  }

  getHumanisedCellValue(colName: string, rowName: string) {
    return EWConstants.getEstTblHumanisedCellVals(colName, rowName)
  }
}
