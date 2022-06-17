export interface Commodity {
    commodity: string,
    mainExchange: string,
    category: string
}

/**
 * for commodity searchbar (category based)
 */
export interface CommoditySearch {
    category: string,
    items: Commodity[]
}