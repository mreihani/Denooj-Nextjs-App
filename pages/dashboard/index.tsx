import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "@/app/components/layouts/dashboard/userDashboardLayout";
import UserProfileForm from "@/app/forms/pages/dashboard/userProfileForm";
import useAuth from "@/app/hooks/auth/useAuth";
import { useEffect, useState } from "react";
import UserProfileVerifySmsForm from "@/app/forms/pages/dashboard/userProfileSmsVerifyForm";
import AllOrdersCount from "@/app/components/pages/dashboard/topCards/allOrdersCount";
import PreparationOrdersCount from "@/app/components/pages/dashboard/topCards/preparationOrdersCount";
import OrdersList from "@/app/components/pages/dashboard/ordersListSection/ordersList";
import { Helmet } from "react-helmet";
import { metaConfig } from "@/app/utils/metaConfig";

const MainContent = () => {

    const [displaySmsInput, setOpenDisplayInput] = useState(false);
    const [temporaryPhoneNumber, setTemporaryPhoneNumber] = useState("");
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

    let { user } = useAuth();
   
    let fullName = user?.user?.firstname + " " + user?.user?.lastname;
    let gender = user?.user?.gender;
    let phone = temporaryPhoneNumber !== "" ? temporaryPhoneNumber : user?.user?.phone;
    let email = user?.user?.emailAddress;

    return (
        <>
            <div className="panel_main_holder">
                <div className="panel_header_title">
                    <span className="panel_title_right">داشبورد</span>
                </div>
                <div className="statistics">
                    <AllOrdersCount/>
                    <PreparationOrdersCount/>
                </div>

                <OrdersList/>

                <div className="panel_header_title">
                    <span className="panel_title_right">اطلاعات پروفایل</span>
                </div>
                <div className="form_holder">
                    {
                        displaySmsInput ? 
                        <UserProfileVerifySmsForm 
                            setOpenDisplayInput={setOpenDisplayInput} 
                            displaySmsInput={displaySmsInput} 
                            temporaryPhoneNumber={temporaryPhoneNumber} 
                            setDisplaySuccessMessage={setDisplaySuccessMessage} 
                            displaySuccessMessage={displaySuccessMessage} 
                        />
                        :
                        <UserProfileForm 
                            fullName={fullName} 
                            gender={gender} 
                            phone={"0" + phone} 
                            email={email} 
                            setOpenDisplayInput={setOpenDisplayInput} 
                            displaySmsInput={displaySmsInput} 
                            setTemporaryPhoneNumber={setTemporaryPhoneNumber} 
                            temporaryPhoneNumber={temporaryPhoneNumber} 
                            setDisplaySuccessMessage={setDisplaySuccessMessage} 
                            displaySuccessMessage={displaySuccessMessage} 
                        />
                    }
                </div>
            </div>
        </>
    )
}

const Dashboard :NextPageWithLayout = (props) => {

    return (
        <>
            <Helmet>
                <title>
                    پیشخوان
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
            <FixedMenu />
        </>
    )
}

Dashboard.getLayout = (page) => <UserDashboardLayout>
    {page}
</UserDashboardLayout>

export default Dashboard;