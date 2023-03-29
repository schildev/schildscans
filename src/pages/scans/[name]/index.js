
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ScanPage.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Robots } from "@/components/Robots";

export async function getStaticPaths() {
    const request = await fetch("https://schildscans.pythonanywhere.com/api/mangas/?format=json");
    const data = await request.json();
    const paths = data.map(manga => {
        return {
            params:{name:manga.slug}
        }
    })
    return {
      paths,
      fallback: 'blocking'
    };
  }

  export async function getStaticProps({ params }){
    const request = await fetch(`https://schildscans.pythonanywhere.com/api/mangas/scans/${params.name}/?format=json`);
    const manga = await request.json();
    if(request.ok){
        return {
            props:{
                manga
            },
            revalidate:10
        }
    }else{
        return {
            props:{}, notFound:true
        }
    }
    
}

  const ScanDetail = ({manga}) => {
    const {name} = useRouter().query;
    if(!manga){
        return (<div style={{color:"#fff"}}>Loading</div>)
    }
    return (
        <>
        {manga &&
            (
                <>
                <Head>
                    <title>{`Read All Chapters of ${manga?.titre} in English or Raw | SchildScans`}</title>
                </Head>
                <Robots description={`Looking for a reliable source to read ${manga?.titre} in English? Look no further than SchildScans ! And the best part ? Our translations are completely free to read online in English! Discover ${name} with SchildScans today.`} />
                </>
            )
        }
        <div className={styles.container}>
            <Image
            src={`https://schildscans.pythonanywhere.com${manga?.manga_image}`}
            height={920}
            width={760}
            alt={`Cover of ${name}`}
            className={styles.cover} />
            <div className={styles.info}>
                <h1 className={`nomar ${styles.font} ${styles.display} ${styles.color}`}>{manga?.titre}</h1>
                <p className="dosis white" style={{fontSize:"clamp(13px, 15px, 16px)", overflowWrap:"anywhere"}}>{manga?.description}</p>
                <nav className={styles.chapters}>
                    <div className={styles.chapList}>
                        <h2 className={"white " + styles.disFont}>En</h2>
                        <div className={styles.chaps}>
                            {manga?.chapters?.en.map(scan => (
                                <Link key={scan+"en"} href={`/scans/${name}/read/En/${scan}`}>[{manga?.titre}] Chapter {scan}</Link>
                            ))}
                        </div>
                    </div>
                    <div className={styles.chapList}>
                        <h2 className={"white " + styles.disFont}>Raw</h2>
                        <div className={styles.chaps}>
                            {manga?.chapters?.raw.map((scan) => (
                            <Link key={scan+"raw"} href={`/scans/${name}/read/raw/${scan}`}>[{manga?.titre}] Chapter {scan}</Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </>
    );
}
 
export default ScanDetail;
