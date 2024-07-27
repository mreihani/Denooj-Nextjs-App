import MainContent from "@/app/components/pages/home/mainContent";
import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import FloatingMiniCart from "@/app/components/shared/footer/floatingMiniCart";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import { useAppSelector } from "@/redux/store";
import { Metadata } from "next";
import { Helmet } from 'react-helmet';
import { metaConfig } from '@/app/utils/metaConfig';


const HomePage = () => {

    const isMiniCartDisplayed = useAppSelector((state) => {
        return state.openFloatingMiniCart.value.isMiniCartDisplayed
    });

    return (
        <>
            <Helmet>
                <title>
                    {metaConfig.metaTitle}
                </title>
                <meta name="description" content={metaConfig.metaDescription} />
                <meta name="keywords" content={metaConfig.metaKeywords} />
                <link rel="icon" type="image/x-icon" href="/assets/img/fave.png" />
            </Helmet>
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
  
export default HomePage;