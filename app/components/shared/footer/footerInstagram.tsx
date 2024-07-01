const FooterInstagram = () => {
    return (
        <>
            <div className="footer_instagram">
                <div className="container">
                    <div className="instagram_title">ما را در اینستاگرام دنبال کنید</div>
                    <div className="instagram_holder">
                        <img 
                            src="/assets/img/den.png"
                            alt="instagram"
                            width={30}
                            height={30}
                        />
                        <span className="instagram_id">denooj</span>
                        <span className="instagram_name">برنج دنوج</span>
                        <a href="https://www.instagram.com/denooj/" className="instagram_btn text-decoration-none">
                            دنبال کردن
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterInstagram;