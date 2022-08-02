/**
 * api paths
 */
export class HttpConstants {
    // http version
    public static HTTP_API_VERSION = "v1"

    /**
     * auth
     */
    public static API_AUTH_LOGIN = "auth/login"

    /**
     * equity
     */
    public static API_EQUITIES_SEARCH = "equity/search"
    public static API_EQUITIES_DETAIL = "equity/detail"
    public static API_EQUITIES_USER_ESTIMATE = "equity/detail/userEstimate"
    public static API_EQUITIES_INSERT = "equity/insert"

    /**
     * commodity
     */
    public static API_COMMO_SEARCH = "commodity/search"
    public static API_COMMO_DETAIL = "commodity/detail"
    public static API_COMMO_USER_ESTIMATE = "commodity/detail/userEstimate"
     public static API_COMMO_INSERT = "commodity/insert"

    /**
    * crypto
    */
    public static API_CRYPTO_SEARCH = "crypto/search"
    public static API_CRYPTO_DETAIL = "crypto/detail"
    public static API_CRYPTO_USER_ESTIMATE = "crypto/detail/userEstimate"
     public static API_CRYPTO_INSERT = "crypto/insert"
}