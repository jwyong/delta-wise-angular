import { COMMON_STR } from './../constants/common-strings';

const divider = [60, 60, 24, 30, 12]
export class DateTimeUtil {
  public static getCurrentTimeISO() {
    return new Date().toISOString()
  }

  public static getDateAsAgo(utcDateStr?: string): string {
    if (!utcDateStr) { return COMMON_STR.date_as_ago.long_time_ago; }

    let time = (Date.now() - Date.parse(utcDateStr)) / 1000;

    // return "xx ago" if within 1 minute
    if (time < 10)
      return COMMON_STR.date_as_ago.just_now;
    else if (time < 60)
      return COMMON_STR.date_as_ago.moment_ago;

    // get time in units (day, hour, minute, seconds...)
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }

    // get plural/singular time unit ago
    var units_ago: string
    if (Math.floor(time) > 1)
      units_ago = COMMON_STR.date_as_ago.units_ago.plural[i]
    else
      units_ago = COMMON_STR.date_as_ago.units_ago.singular[i]

    // return full str with time + time unit ago
    return `${Math.floor(time)} ${units_ago}`
  }
}