import { EWStrings } from "./ew-strings";

/**
 * string values for code use (e.g. keys, params, etc)
 */
export class EWConstants {
    //=== validation
    // required
    public static KEY_REQUIRED: string = 'required';

    // email
    public static KEY_EMAIL: string = 'email';

    // pattern
    public static KEY_PATTERN: string = 'pattern';

    /**
     * estimate table related
     */
    // static name col name
    public static EST_TBL_NAME_COL = 'name'

    // highlighting class for est table
    public static EST_TBL_HIGHLIGHT_CLASS = 'est-table-hover'

    // base class name for est table data cells
    public static EST_TBL_DATA_CELL_BC = 'text-center est-table-data-col cursor-pointer'

    // base class name for est table first column (name col)
    public static EST_TBL_FIRST_COL_BC = 'est-table-first-col'

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
        if (colName == this.EST_TBL_NAME_COL)
            // name column: show localised rowType based on mod
            switch (module) {
                case EnumModules.equities:
                    return EWStrings.getCompanyRowTypeName(rowName)

                default:
                    return rowName
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
                return `${sign} ${EWStrings.VAL_EST_PERCENT_DIFF_RANGE[strIndex]}`
            }
        }
    }

}

export enum EnumModules {
    // auth
    login = 'login',
    forgotPword = 'forgotPword',
    resetPword = 'resetPword',

    // home
    equities = 'equities',
    commodities = 'commodities',
    crypto = 'crypto'
}