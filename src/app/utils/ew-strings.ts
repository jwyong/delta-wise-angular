import { CompanyRowType } from './../models/equities/company-detail';
/**
 * string values for display
 */
export class EWStrings {
    /**
     * auth
     */
    //=== card title/subTitles
    public static VAL_LOGIN = $localize`:@@login:Login`
    public static VAL_FORGOT_PWORD = $localize`:@@forgot_pword:Forgot password`
    public static VAL_RESET_PWORD = $localize`:@@reset_pword:Reset password`

    public static VAL_LOGIN_SUBTITLE = $localize`:@@login_sub:Welcome to DeltaWise. Please login to continue`
    public static VAL_FORGOT_PWORD_SUBTITLE = $localize`:@@forgot_pword_sub:Please input your registered email address. We will
    send an email to reset your password.`
    public static VAL_RESET_PWORD_SUBTITLE = $localize`:@@reset_pword_sub:Please input your new password.`    

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
    // capitalise word
    public static capitalise(text: string): string {
        return text[0].toUpperCase() + text.substring(1);
    }

    // request addition dialog
    public static addNew(item: string) {
        return $localize`:@@add_new:Add new ${item}`
    }
    public static VAL_COMP_NAME = $localize`:@@company_name:Company name and ticker`
    public static VAL_COMMO_NAME = $localize`:@@commo_name:Commodity name, main exchange, category, etc.`
    public static VAL_CRYPTO_NAME = $localize`:@@crypto_name:Cryptocurrency name and symbol`

    // date range picker
    public static VAL_DRP_0: string = "All time"
    public static VAL_DRP_90: string = "3 months"
    public static VAL_DRP_28: string = "28 days"
    public static VAL_DRP_14: string = "14 days"
    public static VAL_DRP_7: string = "7 days"

    // date as ago
    // public static VAL_LONG_TIME_AGO = "a long time ago"
    // public static VAL_JUST_NOW = "just now"
    // public static VAL_A_MOMENT_AGO = "a moment ago"

    // estimates
    public static VAL_LOWER = $localize`:@@lower_than:lower`
    public static VAL_HIGHER = $localize`:@@higher_than:higher`
    public static VAL_LESS = $localize`:@@less_than:less`
    public static VAL_MORE = $localize`:@@more_than:more`
    public static VAL_EST_PERCENT_DIFF_RANGE: string[] = [
        "0 - 2.5%", "2.5 - 5.0%", "5.0 - 7.5%", "7.5 - 10.0%",
        "10.0 - 12.5%", "12.5 - 15.0%", "15.0 - 17.5%", "17.5 - 20.0%", "20.0%"
    ]
    public static VAL_EST_PERCENT_DIFF: string[] = [
        "2.5", "5.0", "7.5", "10.0", "12.5", "15.0", "17.5", "20.0", "20.0"
    ]

    public static estimateUpdated(name: string) {
        return $localize`:@@est_updated:Your estimate for ${name} has been updated`
    }

    /**
     * error msges
     */
    // generic error
    public static errorGeneric(error: string) {
        var errStr = $localize`:@@error_generic:Something went wrong, please try again later`

        if (error.length > 0)
            errStr = `${errStr} (${error})`

        return errStr
    }

    // no search result
    public static VAL_ERR_NO_SEARCH_RES = $localize`:@@err_no_search_res:No search results. Click here to request addition.`

    /**
     * estimates table (single - for commo and crypto mods)
     */
    public static VAL_EST_DIFF = $localize`:@@est_diff:Percentage Difference (%)`

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
    public static VAL_EQUITIES: string = $localize`:@@equities:Equities`
    public static VAL_COMPANY: string = $localize`:@@company:Company`
    public static VAL_DETAILS: string = $localize`:@@details:Details`

    public static getCompanyRowTypeName(name: string) {
        return {
            [CompanyRowType.revenue]: $localize`:@@revenue:Revenue`,
            [CompanyRowType.ebit]: "EBIT",
            [CompanyRowType.ebitda]: "EBITDA",
            [CompanyRowType.net_income]: $localize`:@@net_income:Net Income`,
            [CompanyRowType.eps]: "EPS"
        }[name]
    }

    // humanised row and col names for equities
    public static getHumanisedEqtColName(colName: string) {
        return `${colName.replace("_", " ")}E`
    }


    /**
     * commodities module
     */
    public static VAL_COMMODITY: string = $localize`:@@commodity:Commodity`
    public static VAL_COMMODITIES: string = $localize`:@@commodities:Commodities`

    /**
     * crypto module
     */
    public static VAL_CRYPTO: string = $localize`:@@crypto:Cryptocurrency`
    public static VAL_CRYPTOS: string = $localize`:@@cryptos:Cryptocurrencies`
}