export interface CategoryHierarchyItem {
    id: string;
    categoryTitle: string;
}

export interface ProductResponse {
    status: string,
    product: Product,
    categoryHierarchyArray: CategoryHierarchyItem[]
} 

export interface Product {
    _id: string;
    productTitle :string;
    images: Images;
    productDiscountedPrice: any,
    productPrice: any,
    productSlug: string,
    shortDesc: string,
    longDesc: string,
    productWeight: string,
    metaTitle: string,
    metaDescription: string,
    metaKeywords: string
}

export interface Images {
    image_275x454 :string
}

export interface PriceTagComponentProps {
    product: any;
}

export interface PaginatedProduct {
    docs: Product[],
    hasMore: boolean,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    limit: number,
    page: number,
    pagingCounter: number,
    totalDocs: number,
    totalPages: number
}

