import { EnumModules } from "./enum/enum-modules";
import { EqtStrDyn } from "./modules/equities-strings";

export const COMMON_STR = {
    // common
    details: $localize`:@@details:Details`,
    terms_of_use: $localize`:@@terms_of_use:Terms of Use`,
    tap_search_get_started: $localize`:@@tap_search_get_started:Tap on the search bar above to get started.`,
    settings: $localize`:@@settings:Settings`,
    user_profile: $localize`:@@user_profile:User Profile`,
    user_name: $localize`:@@user_name:Username`,
    period: $localize`:@@period:Period`,

    // date as ago
    date_as_ago: {
        long_time_ago: $localize`:@@long_time_ago:a long time ago`,
        just_now: $localize`:@@just_now:just now`,
        moment_ago: $localize`:@@moment_ago:a moment ago`,
        units_ago: {
            singular: [
                $localize`:@@second_ago:second ago`, $localize`:@@minute_ago:minute ago`, $localize`:@@hour_ago:hour ago`,
                $localize`:@@day_ago:day ago`, $localize`:@@month_ago:month ago`, $localize`:@@year_ago:year ago`,
            ],
            plural: [
                $localize`:@@seconds_ago:seconds ago`, $localize`:@@minutes_ago:minutes ago`, $localize`:@@hours_ago:hours ago`,
                $localize`:@@days_ago:days ago`, $localize`:@@months_ago:months ago`, $localize`:@@years_ago:years ago`,
            ]
        }
    },

    months_short: [
        $localize`:@@jan:Jan`, $localize`:@@feb:Feb`, $localize`:@@mar:Mar`, $localize`:@@apr:Apr`, $localize`:@@may:May`, $localize`:@@jun:Jun`,
        $localize`:@@jul:Jul`, $localize`:@@aug:Aug`, $localize`:@@sep:Sep`, $localize`:@@oct:Oct`, $localize`:@@nov:Nov`, $localize`:@@dec:Dec`,
    ],

    months_long: [
        $localize`:@@jan:January`, $localize`:@@feb:February`, $localize`:@@mar:March`, $localize`:@@apr:April`, $localize`:@@may:May`, $localize`:@@jun:June`,
        $localize`:@@jul:July`, $localize`:@@aug:August`, $localize`:@@sep:September`, $localize`:@@oct:October`, $localize`:@@nov:November`, $localize`:@@dec:December`,
    ],

    // main search bar
    search_bar: {
        search: $localize`:@@search:Search`,
    },

    // search > request add 
    request_add: {
        input_label: {
            equity: $localize`:@@equity_ra_input:Company name and ticker`,
            commodity: $localize`:@@commo_ra_input:Commodity name, main exchange, category, etc.`,
            crypto: $localize`:@@crypto_ra_input:Cryptocurrency name and symbol`
        }
    },

    // watchlist
    watchlist: {
        plural: $localize`:@@watchlists:Watchlists`,
        delete: $localize`:@@delete_watchlist_title:Delete watchlist`,
        create_new: $localize`:@@create_new_wl:Create new watchlist`,
        add_new: $localize`:@@add_new_wl:Add new watchlist`,
        watchlist_name: $localize`:@@watchlist_name:Watchlist name`,

        // blank ux
        no_watchlists: $localize`:@@no_watchlists:No watchlists yet.`,
        no_items: $localize`:@@no_items_in_wl:No items in this watchlist.`,
        click_add_new_wl: $localize`:@@click_add_new_wl:Click here to add new watchlist.`,
    },

    // recently searched
    recent_search: {
        recently_searched: $localize`:@@recently_searched:Recently searched`,
        no_recent_search: $localize`:@@no_recent_search:No recently searched items yet.`,
    },

    // estimates
    estimates: {
        constants: {
            table: {
                name_col: 'name',
                highlight_class: 'est-table-hover',
                first_col_base_class: 'est-table-first-col',
                data_cell_base_class: 'text-center est-table-data-col cursor-pointer',
            }
        },
        perc_diff: {
            title: $localize`:@@est_diff:Percentage Difference (%)`,
            arr_value: [
                "2.5", "5.0", "7.5", "10.0", "12.5", "15.0", "17.5", "20.0", "20.0"
            ],
            arr_range: [
                "0 - 2.5%", "2.5 - 5.0%", "5.0 - 7.5%", "7.5 - 10.0%",
                "10.0 - 12.5%", "12.5 - 15.0%", "15.0 - 17.5%", "17.5 - 20.0%", "20.0%"
            ]
        },
        lower: $localize`:@@lower_than:lower`,
        higher: $localize`:@@higher_than:higher`,
        less: $localize`:@@less_than:less`,
        more: $localize`:@@more_than:more`,

        your_est: $localize`:@@your_est:Your estimate`,
        last_est_date: $localize`:@@last_est_date:Date of your last estimate`,
        no_of_contributors: $localize`:@@no_of_contributors:No. of contributors`,
        est_table_disclaimer: $localize`:@@est_table_disclaimer:*Cell value reflects your estimate versus the median`,

    },

    // date range picker
    date_range_picker: {
        date_range: $localize`:@@date_range:Date range`,
        options: {
            0: $localize`:@@all_time:All time`,
            90: $localize`:@@3_months:3 months`,
            28: $localize`:@@28_days:28 days`,
            14: $localize`:@@14_days:14 days`,
            7: $localize`:@@7_days:7 days`,
        }

    },

    // dialog confirmations
    confirmation: {
        ok: $localize`:@@ok:Ok`,
        cancel: $localize`:@@canel:Cancel`,
        yes: $localize`:@@yes:Yes`,
        no: $localize`:@@no:No`,
        submit: $localize`:@@submit:Submit`,
        update: $localize`:@@update:Update`,
        close: $localize`:@@close:Close`
    },
}

export class CommonStrDyn {
    /**
     * common functions
     */
    // capitalise word
    public static capitalise(text: string): string {
        return text[0].toUpperCase() + text.substring(1);
    }

    /**
     * search
     */
    // "Search Company"
    public static searchBarLabel(item: string) {
        return $localize`:@@search_label:Search ${item}`
    }

    // request addition dialog
    public static addNew(item: string) {
        return $localize`:@@add_new:Add new ${item}`
    }

    /**
     * watchlist
     */
    public static deleteWatchlist(name: string): string {
        return $localize`:@@delete_watchlist_desc:Are you sure you want to delete this watchlist (${name})? This action cannot be undone.`
    }

    /**
     * estiamtes
     */
    public static estimateUpdated(name: string) {
        return $localize`:@@est_updated:Your estimate for ${name} has been updated`
    }
    public static inputTrialsRemaining(name: string) {
        return $localize`:@@input_trials_remaining:You have ${name} input trials remaining`
    }

    /**
    * humanised cell values for est table data cols:
    * - show "?" for null cells
    * - show range of %diff in range of 2.5%, from 0 up to 20%
    * - e.g. 0 - 2.5%, 2.5 - 5.0%, 5.0 - 7.5%, ... , 17.5 - 20.0%, 20.0%
    * - add > or < sign in front based on %diff is -ve or +ve
    * e.g.:
    * % DIFF = 1.3%, result = > 0 - 2.5%
    * % DIFF = -1.3%, result = < 0 - 2.5%
    * % DIFF = 3.3%, result = > 2.5 - 5.0%
    * % DIFF = -17.2%, result = < 17.5 - 20.0%
    * % DIFF = 33.2%, result = > 20.0%
    * % DIFF = -23.2%, result = < 20.0%
    */
    public static getEstTblHumanisedCellVals(module: EnumModules, colName: string, rowName: string) {
        if (colName == COMMON_STR.estimates.constants.table.name_col)
            // name column: show localised rowType based on mod
            switch (module) {
                case EnumModules.equities:
                    return EqtStrDyn.getCompanyRowTypeName(rowName)

                default:
                    const split = rowName.split("_")

                    return `${split[2]} ${COMMON_STR.months_short[Number(split[1]) - 1]} '${split[0]}`
            }

        else {
            // show "?" for nulls
            if (rowName == null)
                return "?"

            else {
                // get humanised range based on %diff range
                var percentDiff = Number(rowName)

                // return ori value if NaN
                if (percentDiff == NaN) return rowName

                // get sign before convert to abs
                let sign = percentDiff >= 0 ? ">" : "<"
                percentDiff = Math.abs(percentDiff)

                var strIndex: number
                switch (true) {
                    case percentDiff < 2.5:
                        strIndex = 0
                        break

                    case percentDiff < 5:
                        strIndex = 1
                        break

                    case percentDiff < 7.5:
                        strIndex = 2
                        break

                    case percentDiff < 10:
                        strIndex = 3
                        break

                    case percentDiff < 12.5:
                        strIndex = 4
                        break

                    case percentDiff < 15:
                        strIndex = 5
                        break

                    case percentDiff < 17.5:
                        strIndex = 6
                        break

                    case percentDiff < 20:
                        strIndex = 7
                        break

                    default:
                        strIndex = 8
                        break
                }

                // add sign in front
                return `${sign} ${COMMON_STR.estimates.perc_diff.arr_range[strIndex]}`
            }
        }
    }
}