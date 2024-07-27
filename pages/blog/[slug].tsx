import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import { metaConfig } from "@/app/utils/metaConfig";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";

const MainContent = () => {
    return (
        <>
            <div className="blog_holder animation_set animation_fade_in_up animation_delay_1 animation_start">
                <img 
                    src="/assets/img/blog.jpg"
                    alt="blog"
                    width={800}
                    height={452}
                />
                <h1 className="blog_title">نکات پخت برنج کشت دوم</h1>
                <span className="blog_date">1403 فروردین 16</span>
                <p className="blog_content">در این مقاله به نحوه پخت ب...در این مورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از  طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و  سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای  متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه  درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با  نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان  خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید  داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان  رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.اله به نحوه پخت ب</p>
                <p className="blog_content">تا با  نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان  خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید  داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان  رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
            </div>
        </>
    )
}

const BlogSingle = () => {

    const router = useRouter();
    const slug = router.query;

    return (
        <>
            <Helmet>
                <title>
                    مقاله
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

export default BlogSingle;