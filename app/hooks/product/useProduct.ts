// hooks/useProduct.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Product, CategoryHierarchyItem, ProductResponse } from '@/app/contracts/product';

export const useProduct = () => {
    const [product, setProduct] = useState<Product>();
    const [categoryHierarchyArray, setCategoryHierarchyArray] = useState<CategoryHierarchyItem[]>();
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        const fetchSingleProduct = async (): Promise<ProductResponse> => {
            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const { slug } = router.query;
            const url = `admin/api/product/${slug}`;

            const response = await fetch(`${domainUrl}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors'
            });

            return await response.json();
        };

        const fetchProduct = async () => {
            const response = await fetchSingleProduct();
            if (response.status === 'success') {
                setProduct(response.product);
                setCategoryHierarchyArray(response.categoryHierarchyArray);
            } else {
                router.push('/404');
            }
        };

        fetchProduct();
    }, [router.isReady]);

    return { product, categoryHierarchyArray };
};