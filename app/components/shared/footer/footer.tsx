const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="footer_right">
                        <div className="footer_description">
                            <a href="#">
                                <img 
                                    src="/assets/img/logo.png"
                                    alt="denooj"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <span>
                                چرا دنوج؟ اگر دنبال بهترین نوع برنج ایرانی هستی جواب سوالت همینه...
                                <br/> 
                                با ما بهترین کیفیت رو تجربه میکنی
                            </span>
                        </div>
                        <div className="footer_menu">
                            <span className="footer_title">لینک های مفید</span>
                            <a href="#" className="menu text-decoration-none">محصولات</a>
                            <a href="#" className="menu text-decoration-none">ترفندها</a>
                            <a href="#" className="menu text-decoration-none">راهنمای خرید</a>
                        </div>
                        <div className="footer_menu">
                            <span className="footer_title">تماس با ما</span>
                            <a href="#" className="menu text-decoration-none">
                                آدرس: بابل شهرک ثباتی بین خرم ۱و ۳ برنج دنوج
                            </a>
                            <br/> 
                            <a href="#" className="menu text-decoration-none">تلفن: 091122222222</a><br/> 
                            <a href="#" className="menu text-decoration-none">زمان پاسخگویی: 9 صبح تا 9 شب</a><br/> 
                        </div>
                        <div className="footer_menu">
                            <span className="footer_title">ما را دنبال کنید:</span>
                            <a href="https://eitaa.com/Farmer_admin" className="menu text-decoration-none">
                                <img 
                                    src="/assets/img/eitaa.webp"
                                    alt="eita"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a href="#" className="menu text-decoration-none">
                                <img 
                                    src="/assets/img/bale.jpg"
                                    alt="bale"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a href="#" className="menu text-decoration-none">
                                <img 
                                    src="/assets/img/sorosh.jpg"
                                    alt="sorosh"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a href="https://www.instagram.com/denooj/" className="menu text-decoration-none">
                                <img 
                                    src="/assets/img/instagram.jpg"
                                    alt="sorosh"
                                    width={30}
                                    height={30}
                                />
                            </a>
                            <a href="https://t.me/frmer" className="menu text-decoration-none">
                                <img 
                                    src="/assets/img/telegram.jpg"
                                    alt="telegram"
                                    width={30}
                                    height={30}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="footer_left">
                        <a href="https://trustseal.enamad.ir/?id=229027&Code=K0wiWOGM3WwkXZ8wvmMm">
                            <img 
                                src="/assets/img/enamad.png"
                                alt="enamad"
                                width={70}
                                height={70}
                            />
                        </a>
                        <a href="#">
                            <img 
                                src="/assets/img/majaz.png"
                                alt="majaz"
                                width={70}
                                height={82}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;