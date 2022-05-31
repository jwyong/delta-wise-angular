import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-watchlist',
  templateUrl: './new-watchlist.component.html',
  styleUrls: ['./new-watchlist.component.css']
})
export class NewWatchlistComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewWatchlistComponent>
  ) { }

  nameFC = new FormControl('', [Validators.required]);
  newWatchlistForm = this.formBuilder.group({
    name: this.nameFC
  });

  ngOnInit(): void {
  }

  // validation
  getNameErrorMsg() {
    // required
    if (this.nameFC.hasError(EWConstants.KEY_REQUIRED))
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`

    return ""
  }

  // form submit - send to api and close dialog
  onSubmit() {
    if (this.newWatchlistForm.invalid) return

    this.dialogRef.close(this.newWatchlistForm.value);
  }
}
