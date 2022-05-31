import { Company } from './equities/company';

export interface Watchlist {
    id: string,
    name: string,
    children?: Company[]
}