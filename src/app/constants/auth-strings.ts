import { COMMON_STR } from 'src/app/constants/common-strings';
export const AUTH_STR = {
    common: {
        email: $localize`:@@email:Email`,
        pword: $localize`:@@pword:Password`,
        submit: COMMON_STR.confirmation.submit
    },
    login: {
        title: $localize`:@@login:Login`,
        subTitle: $localize`:@@login_sub:Welcome to DeltaWise. Please login to continue`
    },
    forgot_pword: {
        title: $localize`:@@forgot_pword:Forgot password`,
        subTitle: $localize`:@@forgot_pword_sub:Please input your registered email address. We will
        send an email to reset your password.`,
        back_to_login: $localize`:@@back_to_login:Back to login`,
    },
    reset_pword: {
        title: $localize`:@@reset_pword:Reset password`,
        subTitle: $localize`:@@reset_pword_sub:Please input your new password.`,
        new_pword_input: $localize`:@@new_pword_input:New password (e.g.: Testing123!)`,
        confirm_pword: $localize`:@@confirm_pword:Confirm password`,
    },
    change_pword: {
        success: $localize`:@@change_pword_success:Password updated successfully, please login with the new password.`
    },
    logout: {
        title: $localize`:@@logout:Logout`,
        subTitle: $localize`:@@logout_sub:Are you sure you want to logout from DeltaWise?`
    }
}