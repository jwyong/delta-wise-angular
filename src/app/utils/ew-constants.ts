/**
 * string values for code use (e.g. keys, params, etc)
 */
export class EWConstants {
    // app version
    public static APP_VERSION = "0.0.6"

    //=== validation
    // required
    public static KEY_REQUIRED: string = 'required';

    // email
    public static KEY_EMAIL: string = 'email';

    // pattern
    public static KEY_PATTERN: string = 'pattern';
}

export enum EnumModules {
    equities = 'equities',
    commodities = 'commodities',
    crypto = 'crypto'
}