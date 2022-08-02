import { CommonStrDyn } from 'src/app/constants/common-strings';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { COMMON_STR } from '../../../constants/common-strings';
import { EstimateDialogComponent } from '../estimate-dialog/estimate-dialog.component';

/**
 * single estimates table with only 1 estimate column (e.g. for commo and crypto)
 */
@Component({
  selector: 'app-est-table-single',
  templateUrl: './est-table-single.component.html',
  styleUrls: ['./est-table-single.component.css']
})
export class EstTableSingleComponent extends BaseComponent implements OnInit {
  nameCol = COMMON_STR.estimates.constants.table.name_col
  percDiffColName = 'percDiff'
  displayedColumns = [this.nameCol, this.percDiffColName]

  @Input()
  isLoadingTable = false

  @Input()
  module = <EnumModules>{}

  @Input()
  title = ""

  @Input()
  id: number | undefined

  @Input()
  displayedData: any[] = []

  @Input()
  selectedDateRangeBS = <BehaviorSubject<number>>{}
  get selectedDateRange() {
    return this.selectedDateRangeBS.value
  }

  set selectedDateRange(value) {
    this.selectedDateRangeBS.next(value)
  }

  /**
  * table highlighting related
  */
  // for highglighting row/col header on mouseover
  mouseOverRowName?: string
  mouseOverColName?: string

  // update which row/col is mouse-over now
  cellOnMouseOver(rowType: string, colName: string) {
    if (colName == this.nameCol) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != this.nameCol) {
      // data columns - use data col css
      if (colName == this.mouseOverColName && rowName == this.mouseOverRowName)
        return `${COMMON_STR.estimates.constants.table.data_cell_base_class} ${COMMON_STR.estimates.constants.table.highlight_class}`
      else return COMMON_STR.estimates.constants.table.data_cell_base_class

    } else {
      // first col
      if (rowName == this.mouseOverRowName)
        return `${COMMON_STR.estimates.constants.table.first_col_base_class} ${COMMON_STR.estimates.constants.table.highlight_class}`
      else return COMMON_STR.estimates.constants.table.first_col_base_class
    }
  }

  /**
   * ui binding
   */
  // get humanised names for header cells
  getHumanisedHeaderCellValue(colName: string) {
    if (colName != this.nameCol)
      return COMMON_STR.estimates.perc_diff.title
    else return ""
  }

  getHumanisedCellValue(colName: string, rowName: string) {
    return CommonStrDyn.getEstTblHumanisedCellVals(this.module, colName, rowName)
  }

  showEstimateDialog(rowName: string, colName: string) {
    if (colName == this.nameCol) return

    // convert rowName (date) to human readable subtitle
    const split = rowName.split("_")
    const subTitle = `${split[2]} ${COMMON_STR.months_short[Number(split[1]) - 1]} '${split[0]}`

    const estimateDialogRef = this.dialog.open(EstimateDialogComponent, {
      panelClass: 'loader-dialog',
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.title,
        subTitle: `${COMMON_STR.period}: ${subTitle}`,
        sdr: this.selectedDateRangeBS,
        module: this.module,
        id: this.id,
        timeFrame: colName,
        rowName: rowName
      }
    });

    // check if user has changed dateRange
    var dialogSelectedDR: number
    const onDialogDateSelectedSub = estimateDialogRef.componentInstance.selectedDateRangeBS.subscribe((value: number) => {
      dialogSelectedDR = value
    })
    var didSubmitEstimate: boolean = false
    const didSubmitEstimateSub = estimateDialogRef.componentInstance.didSubmitEstimateEE.subscribe((value: boolean) => {
      if (value)
        didSubmitEstimate = value
    })

    estimateDialogRef.afterClosed().subscribe((_: any) => {
      // unsubscribe dialog observer
      onDialogDateSelectedSub.unsubscribe()
      didSubmitEstimateSub.unsubscribe()

      // update sdr/refresh api
      switch (true) {
        // update sdr if got changes
        case dialogSelectedDR != null && dialogSelectedDR != this.selectedDateRange:
          this.selectedDateRange = dialogSelectedDR
          break

        // refresh api if got submit
        case didSubmitEstimate:
          this.dataService.shouldRefreshDetails.next(!this.dataService.shouldRefreshDetails)
          break

        default:
          break
      }
    });
  }
}
