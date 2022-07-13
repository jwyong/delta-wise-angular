import { CompanyRowType } from "src/app/models/equities/company-detail"

export const EQT_STR = {
    equity: {
        plural: $localize`:@@equities:Equities`,
    },
    company: {
        singular: $localize`:@@company:Company`,
    },
}

export class EqtStrDyn {
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
}