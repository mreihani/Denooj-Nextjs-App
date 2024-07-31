import useAuth from "@/app/hooks/auth/useAuth";
import { useRouter } from "next/router";
import { ReactNode } from "react"

interface Props {
    children : ReactNode
}

const UserCheckoutLayout = ({children} : Props) => {
    const router = useRouter();
    const {user, error, loading} = useAuth();
 
    if(loading) {
        return (
            <div className="full-screen-loader">
                <h3>
                  در حال بارگذاری...
                </h3>
                <img 
                    className="img_logo animation_set animation_fade_in animation_start"
                    src="/assets/img/logo.png"
                    alt="logo"
                    width={80}
                    height={80}
                />
            </div>
        )
    }

    if(error || user.status == 'failed') {
        // show error
        router.push('/user/auth/login');
        return <></>;
    }
    
    return (
        <div>
            {children}
        </div>
    )
}

export default UserCheckoutLayout;