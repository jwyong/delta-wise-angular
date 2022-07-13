export const VALIDATION_STR = {
    keys: {
        required: 'required',
        email: 'email',
        pattern: 'pattern'
    },
    validation: {
        required: $localize`:@@vld_required:You must enter a value`,
        number: $localize`:@@vld_number:You must enter a valid number`,
        email: $localize`:@@vld_email:You must enter a valid email`,
        pword: {
            length: $localize`:@@vld_pword_length:Password must have at least 8 characters`,
            chars: $localize`:@@vld_pword_chars:Password must have at least 1 upper case, 1 lower case, 1 number and 1 symbol`,
            match: $localize`:@@vld_pwrod_match:Passwords not matching`,
        }
    },
    rules: {
        pword: $localize`:@@vld_pword:Your new password must have at least: 
    - 8 characters
    - 1 upper case
    - 1 lower case
    - 1 number
    - 1 symbol`,
    }
}