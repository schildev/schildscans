import Navbar from "./Navbar";
import dynamic from "next/dynamic"
import Head from "next/head"

const DynamicFooter = dynamic(() => import("./Footer"), {
    loading: () => <p>Loading...</p>,
  })
const Layout = ({children}) => {
    return (
        <>
        <Head>
             <meta name="google-site-verification" content="_8TG8uB_TfujnFc1vimMhnZ0S33nyLfGeuCgRx-uqr8" />
        </Head>
        <Navbar/>
        <div className="container">
            {children}
        </div>
        <DynamicFooter/>
        </>
    );
}
 
export default Layout;
