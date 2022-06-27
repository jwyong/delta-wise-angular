export interface Commodity {
    id?: number,
    commodity: string,
    mainExchange: string,
    category: string,
    subCategory?: string,
    mic?: string,
    contractSize?: string,
    symbol?: string | null,
    currency?: string | null
}

/**
 * for commodity searchbar (category based)
 */
export interface CommoditySearch {
    category: string,
    items: Commodity[]
}