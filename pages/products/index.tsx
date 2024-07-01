import MainContent from "@/app/components/pages/products/mainContent";
import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import FloatingMiniCart from "@/app/components/shared/footer/floatingMiniCart";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import { useAppSelector } from "@/redux/store";

const Products = () => {

    const isMiniCartDisplayed = useAppSelector((state) => {
        return state.openFloatingMiniCart.value.isMiniCartDisplayed
    });


    return (
        <>
            <Header />
            <SideMenu />
            <MainContent />
            <FooterInstagram />
            <Footer />
            <FooterCopyRight />
            {
                isMiniCartDisplayed ?
                <FloatingMiniCart /> :
                <FixedMenu />
            }
        </>
    );
};
  
export default Products;