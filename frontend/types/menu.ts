export interface MenuProps {
    style: string;
    showMoreBtn: boolean;
    endIndex: number;
}

export interface ProductCardProps {
    item: Product;
}

export type Product = {
    id: number;
    imgSrc: string;
    name: string;
    priceRange: string;
    slug: string;
    sale?: boolean;
    category: string;
    isInCart: boolean; // New property
    isInWishlist: boolean; // New property
    price: number;
    quantity: number;
    total: number;
    foodType?: string[];
    status?: string;
    rating?: string;
    desc: string;
};