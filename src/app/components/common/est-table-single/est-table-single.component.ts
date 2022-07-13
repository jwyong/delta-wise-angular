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
  displayedColumns: any[] = []
  displayedData: any[] = []
  isLoadingTable = false

  percDiffColName = 'percDiff'

  @Input()
  module = <EnumModules>{}

  @Input()
  title = ""

  @Input()
  id = ""

  @Input()
  selectedDateRangeBS = <BehaviorSubject<number>>{}
  get selectedDateRange() {
    return this.selectedDateRangeBS.value
  }

  set selectedDateRange(value) {
    this.selectedDateRangeBS.next(value)
  }

  override ngOnInit(): void {
    // simulate get table data
    this.setIsLoading(true)
    this.isLoadingTable = true

    setTimeout(() => {
      this.displayedColumns = [COMMON_STR.estimates.constants.table.name_col, this.percDiffColName]
      this.displayedData = [
        { name: '31 May ‘22', percDiff: 35.398 },
        { name: '30 June ‘22', [this.percDiffColName]: -24.33 },
        { name: '30 Sept ‘22', [this.percDiffColName]: null },
        { name: '31 Dec ‘22', [this.percDiffColName]: -1.21 },
        { name: '31 March ‘23', [this.percDiffColName]: null },
        { name: '31 June ‘23', [this.percDiffColName]: 16.25 },
        { name: '31 Sept ’23', [this.percDiffColName]: 12.33 },
      ]

      this.setIsLoading(false)
      this.isLoadingTable = false
    }, 800);
  }

  /**
  * table highlighting related
  */
  // for highglighting row/col header on mouseover
  mouseOverRowName?: string
  mouseOverColName?: string

  // update which row/col is mouse-over now
  cellOnMouseOver(rowType: string, colName: string) {
    if (colName == COMMON_STR.estimates.constants.table.name_col) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != COMMON_STR.estimates.constants.table.name_col) {
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
    if (colName != COMMON_STR.estimates.constants.table.name_col)
      return COMMON_STR.estimates.perc_diff.title
    else return ""
  }

  getHumanisedCellValue(colName: string, rowName: string) {
    return CommonStrDyn.getEstTblHumanisedCellVals(this.module, colName, rowName)
  }

  showEstimateDialog(rowName: string, colName: string) {
    const estimateDialogRef = this.dialog.open(EstimateDialogComponent, {
      panelClass: 'loader-dialog',
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.title,
        subTitle: `Period: ${rowName}`,
        sdr: this.selectedDateRangeBS,
        id: this.id,
        timeFrame: colName,
        rowType: rowName
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
          // this.getCompanyDets()
          break

        default:
          break
      }
    });
  }
}
