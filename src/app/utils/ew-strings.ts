/**
 * string values for display
 */
export class EWStrings {
    //=== validation
    // required
    public static VAL_REQUIRED: string = `You must enter a value`;

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

    //=== change pword
    public static VAL_PWORD_UPDATE_SUCCESS: string = 'Password updated successfully, please login with the new password.';
}