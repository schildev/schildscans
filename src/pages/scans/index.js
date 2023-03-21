
import Scanlist from "@/components/Scanlist";
import Head from "next/head";

import { Robots } from "@/components/Robots";

export async function getStaticProps() {
    const res = await fetch('https://schildscans.pythonanywhere.com/api/mangas/?format=json');
    const mangas = await res.json();
    return {
      props: {
        mangas
      },
      revalidate:30
    }
  }

const Scans = ({mangas}) => {
  
    return (
        <>
        <Head>
          <title>Browse Our Extensive Collection of Manga Translations in English | SchildScans</title>
        </Head>
        <Robots 
          description={"Explore our extensive collection of manga translations in English at SchildScans. Browse our easy-to-use directory of Comedy, Romance, Trip, and Shonen manga series, all conveniently organized in one online place. Start browsing our collection today and discover your next manga obsession for free!"} />
        
        <div className="content">
            <h1 className="dosis center white">All the translated scans</h1>
            <Scanlist scans={mangas} />
        </div>
        </>
    );
}
 
export default Scans;