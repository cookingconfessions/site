import { Product } from "@/context/CafeuContext";

export interface MenuProps {
    style: string;
    showMoreBtn: boolean;
    endIndex: number;
}

export interface ProductCardProps {
    item: Product;
}