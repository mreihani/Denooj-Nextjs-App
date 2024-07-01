import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import Pagination from "@/app/components/shared/pagination/products/pagination";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";

const MainContent = () => {
    return (
        <>
            <div className="product_archive animation_set animation_fade_in_up animation_delay_1 animation_start" style={{marginTop: "50px"}}>
                <div className="container">
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="blog_item">
                        <img 
                            src="/assets/img/blog.jpg"
                            alt="blog"
                            width={100}
                            height={100}
                        />
                        <div className="blog_detail">
                            <a href="#" className="blog_title">نکات پخت برنج کشت دوم</a>
                            <span className="blog_date">1403 فروردین 16</span>
                            <span className="blog_content">در این مقاله به نحوه پخت ب...در این مقاله به نحوه پخت ب</span>
                            <a href="#" className="blog_link"> متن کامل <i className="fal fa-arrow-left"></i></a>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const HomePage = () => {
    return (
        <>
            <Header />
            <MainContent />
            <Pagination />
            <FooterInstagram />
            <Footer />
            <FooterCopyRight />
            <FixedMenu />
        </>
    );
};
  
export default HomePage;