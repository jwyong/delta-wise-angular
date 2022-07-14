import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '../../../models/common/date-range';
import { COMMON_STR } from '../../../constants/common-strings';

/**
 * date range picker for estimates
 */
@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
  dateRangePickerStr = COMMON_STR.date_range_picker

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
    { value: 0, displayValue: this.dateRangePickerStr.options[0] },
    { value: 90, displayValue: this.dateRangePickerStr.options[90] },
    { value: 28, displayValue: this.dateRangePickerStr.options[28] },
    { value: 14, displayValue: this.dateRangePickerStr.options[14] },
    { value: 7, displayValue: this.dateRangePickerStr.options[7] },
  ];

  @Output() onDateRangeSelected: EventEmitter<number> = new EventEmitter();
}