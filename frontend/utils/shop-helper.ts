import { MenuItem } from "@/types/menu";

export class ShopHelper {
    static getMaximumPrice(products: MenuItem[]): number {
        if (products.length === 0) {
            return 200;
        }

        let maxPrice = -Infinity;

        for (const product of products) {
            if (product.price > maxPrice) {
                maxPrice = product.price;
            }
        }

        return maxPrice;
    }
}