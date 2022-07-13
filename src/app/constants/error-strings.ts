export const ERROR_STR = {
    search: {
        no_results: $localize`:@@no_search_results:No search results. Click here to request addition.`
    },
    jwt: {
        expired: {
            title: $localize`:@@err_token_expired_title:Session expired`,
            subTitle: $localize`:@@err_token_expired_desc:Your session has expired. Please login again to continue.`
        }
    }
}

export class ErroStrDyn {
    // generic error
    public static errorGeneric(error: string) {
        var errStr = $localize`:@@error_generic:Something went wrong, please try again later`

        if (error.length > 0)
            errStr = `${errStr} (${error})`

        return errStr
    }
}