import { COMMON_STR } from 'src/app/constants/common-strings';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';

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
  watchlistStr = COMMON_STR.watchlist
  confStr = COMMON_STR.confirmation

  nameFC = new FormControl('', [Validators.required]);
  newWatchlistForm = this.formBuilder.group({
    name: this.nameFC
  });

  ngOnInit(): void {
  }

  // validation
  getNameErrorMsg() {
    // required
    if (this.nameFC.hasError(VALIDATION_STR.keys.required))
      return VALIDATION_STR.validation.required

    return ""
  }

  // form submit - send to api and close dialog
  onSubmit() {
    if (this.newWatchlistForm.invalid) return

    this.dialogRef.close(this.newWatchlistForm.value);
  }
}
