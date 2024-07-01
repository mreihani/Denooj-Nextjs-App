import { getTaggedProduct } from "@/app/hooks/product/taggedProducts";
import { useEffect, useState } from "react";
import {Product, Images} from '../../../contracts/product/index';
import Link from "next/link";
import RecommendedProduct from "./components/recommendedProduct";
import EconomyProduct from "./components/economyProduct";
import NorthProduct from "./components/northProduct";
import PopularProduct from "./components/popularProduct";

const MainContent = () => {

    return (
        <>
            <RecommendedProduct />

            <div className="btn_buy_holder  animation_set animation_fade_in_up animation_delay_3 animation_start">
                <a href="#" className="btn_buy animation_set animation_fade_zoom_infinite animation_start text-decoration-none">
                    <span>
                        نمیدونم چه برنجی بگیرم!
                    </span>
                    <i className="fas fa-arrow-left"></i>
                </a>
            </div>

            <PopularProduct />
            <NorthProduct />
            <EconomyProduct />
        </>
    )
};

export default MainContent;