import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import 'react-quill/dist/quill.bubble.css';
import { useAppSelector } from "@/redux/store";
import FloatingMiniCart from "@/app/components/shared/footer/floatingMiniCart";
import MainContent from "@/app/components/pages/product/mainContent";

const ProductSingle = () => {

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
    )
}

export default ProductSingle;