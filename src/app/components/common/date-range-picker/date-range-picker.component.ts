import { DateRange } from '../../../models/common/date-range';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * date range based on days:
   * 0 = all time
   * 90 = 3 months
   * 28 = 28 days
   * 14, 7
   */
  @Input()
  sdr = 0
  dateRanges: DateRange[] = [
    { value: 0, displayValue: $localize`:@@company:${EWStrings.VAL_DRP_0}` },
    { value: 90, displayValue: $localize`:@@company:${EWStrings.VAL_DRP_90}` },
    { value: 28, displayValue: $localize`:@@company:${EWStrings.VAL_DRP_28}` },
    { value: 14, displayValue: $localize`:@@company:${EWStrings.VAL_DRP_14}` },
    { value: 7, displayValue: $localize`:@@company:${EWStrings.VAL_DRP_7}` },
  ];

  @Output() onDateRangeSelected: EventEmitter<number> = new EventEmitter();
}