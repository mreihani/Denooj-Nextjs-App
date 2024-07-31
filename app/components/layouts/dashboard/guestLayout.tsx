import useAuth from "@/app/hooks/auth/useAuth";
import { useRouter } from "next/router";
import { ReactNode } from "react"

interface Props {
    children : ReactNode
}

const GuestLayout = ({children} : Props) => {
    const router = useRouter();
    const {user, error, loading} = useAuth();
  
    if(user?.status == 'success') {
        router.push('/dashboard');
        return <></>;
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default GuestLayout;