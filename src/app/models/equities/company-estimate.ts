export interface CompanyDetail {
    company_name: string,
    ticker: string,
    data: any
}

// export interface CompanyEstimate {
//     revenue: string
//     ebit: string
//     ebitda: string
//     net_income: string
//     eps: string
// }

/**
 * for binding to table UI
 */
// export interface CompEstTable {
//     rowType: CompanyTableType,
//     q122: string,
//     q222: string,
//     q322: string,
//     q422: string,
//     fy22: string,
//     fy23: string,
//     fy24: string,
//     fy25: string,
//     fy26: string,
//     fy27: string,
//     fy28: string,
//     fy29: string,
// }

export enum CompanyTableType {
    revenue = "Revenue",
    ebit = "EBIT",
    ebitda = "EBITDA",
    netIncome = "Net Income",
    eps = "EPS"
}