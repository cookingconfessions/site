export interface MenuProps {
    style: string;
    showMoreBtn: boolean;
    endIndex: number;
}

export interface ProductCardProps {
    item: MenuItem;
}

export interface MenuItemReview {
    id: string;
    name: string;
    email: string;
    message: string;
    isVisible: boolean;
    createdAt: string;
    replies: MenuItemReview[];
}

export interface MenuItemTag {
    id: string;
    name: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: string;
    slug: string;
    price: number;
    image: string;
    isAvailable: boolean;
    code: string;
    tags: MenuItemTag[];
    reviews: MenuItemReview[];
};

export interface CartItem extends MenuItem {
    isInCart: boolean; // New property
    quantity: number;
    total: number;
}

export interface MenuItemCategory {
    id: string,
    name: string;
    description: string;
    image: string;
}

export interface ShopDetailsProp {
    shopData: MenuItem;
}