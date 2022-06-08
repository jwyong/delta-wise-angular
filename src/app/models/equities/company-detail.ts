export interface CompanyDetail {
    company_name: string,
    ticker: string,
    data: any
}

export enum CompanyRowType {
    revenue = 'revenue',
    ebit = 'ebit',
    ebitda = 'ebitda',
    net_income = 'net_income',
    eps = 'eps'
}