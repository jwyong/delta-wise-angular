import { Company } from './equities/company';

export interface Watchlist {
    id: string,
    name: string,
    children?: WatchlistItem[]
}

export interface WatchlistItem {
    id: string,
    name: string,
}