import Navbar from "./Navbar";
import dynamic from 'next/dynamic'
import Head from "next/head"

const DynamicFooter = dynamic(() => import('./Footer'), {
    loading: () => <p>Loading...</p>,
  })
const Layout = ({children}) => {
    return (
        <>
        <Head>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabin&family=Tilt+Neon&family=Poiret+One&family=Dosis:wght@200&family=Comfortaa:wght@300&display=swap');
        </style>
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