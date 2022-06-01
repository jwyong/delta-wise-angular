/**
 * string values for display
 */
export class EWStrings {
    /**
     * auth
     */
    //=== validation
    // required
    public static VAL_REQUIRED: string = `You must enter a value`;

    // number
    public static VAL_NUMBER: string = `You must enter a valid number`;

    // email
    public static VAL_INVALID_EMAIL: string = 'Not a valid email';

    // password
    public static VAL_PWORD_RULE: string = `Your new password must have at least: 
    - 8 characters
    - 1 upper case
    - 1 lower case
    - 1 number
    - 1 symbol`;
    public static VAL_INVALID_PWORD_LENGTH: string = 'Password must have at least 8 characters';
    public static VAL_INVALID_PWORD_CHARS: string = 'Password must have at least 1 upper case, 1 lower case, 1 number and 1 symbol';
    public static VAL_INVALID_PWORD_DIFF: string = 'Passwords not matching';

    //=== login

    //=== change pword
    public static VAL_PWORD_UPDATE_SUCCESS: string = 'Password updated successfully, please login with the new password.';

    /**
     * common
     */
    // date range picker
    public static VAL_DRP_0: string = "All time"
    public static VAL_DRP_90: string = "3 months"
    public static VAL_DRP_28: string = "28 days"
    public static VAL_DRP_14: string = "14 days"
    public static VAL_DRP_7: string = "7 days"

    // estimate %diff
    public static VAL_LOWER = "lower"
    public static VAL_HIGHER = "higher"

    // generic error
    public static errorGeneric(error: string) {
        var errStr = $localize`:@@error_generic:Something went wrong, please try again later`

        if (error.length > 0)
            errStr = `${errStr} (${error})`

        return errStr
    }

    /**
     * watchlist
     */
    public static VAL_WATCHLIST: string = "Watchlist"
    public static deleteWatchlist(name: string): string {
        return $localize`:@@confirm_delete_watchlist:Delete this watchlist (${name})? This action cannot be undone.`
    }

    /**
     * equities module
     */
    public static VAL_EQUITIES: string = "Equities"
    public static VAL_COMPANY: string = "Company"
    public static VAL_DETAILS: string = "Details"

    /**
     * commodities module
     */
    public static VAL_COMMODITY: string = "Commodity"

    /**
     * crypto module
     */
    public static VAL_CRYPTO: string = "Cryptocurrency"
}