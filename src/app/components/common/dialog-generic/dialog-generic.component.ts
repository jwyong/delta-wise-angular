import { EWStrings } from 'src/app/utils/ew-strings';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonServices } from 'src/app/services/common-services';

@Component({
  selector: 'app-dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrls: ['./dialog-generic.component.scss']
})
export class DialogGenericComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogGenericData,
    private dialogRef: MatDialogRef<DialogGenericComponent>,
    protected commonServices: CommonServices,
  ) { }

  ngOnInit(): void {
  }

  /**
   * ui binding
   */
  // positive btn - default to "Yes" for double action, "Ok" for single action
  getPositiveBtnStr() {
    return this.data.positiveBtnStr ?? this.data.isSingleAction != true ?
      EWStrings.VAL_YES : EWStrings.VAL_OK
  }

  positiveBtnFunc() {
    if (this.data.positiveBtnFunc != null)
      this.data.positiveBtnFunc()

    if (this.data.positiveDismissDisabled != true)
      this.dialogRef.close()
  }

  // negative btn - not shown for singleAction, default to "No" for double action
  getNegativeBtnStr() {
    return this.data.negativeBtnStr ??  EWStrings.VAL_NO
  }

  negativeBtnFunc() {
    if (this.data.negativeBtnFunc != null)
      this.data.negativeBtnFunc()

    if (this.data.negativeDismissDisabled != true)
      this.dialogRef.close()
  }
}

export interface DialogGenericData {
  title?: string,
  subTitle?: string,
  isSingleAction?: boolean,
  positiveBtnStr?: string,
  positiveBtnFunc?: () => void,
  positiveDismissDisabled?: boolean,
  negativeBtnStr?: string,
  negativeBtnFunc?: () => void,
  negativeDismissDisabled?: boolean,
}