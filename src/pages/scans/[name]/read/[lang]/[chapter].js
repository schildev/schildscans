import {useRouter} from "next/router";
import styles from "@/styles/Chapter.module.css"
import Link from "next/link";
import Image from "next/image";
import { useState, Fragment, useEffect, useRef } from "react";
import {useImmer} from "use-immer";
import Head from "next/head";
import { Robots } from "@/components/Robots";

export async function getStaticPaths(){
    const request = await fetch(`https://schildscans.pythonanywhere.com/api/mangas/all?format=json`);
    const mangas = await request.json();
    let paths = [];
    mangas.forEach(manga => {
        for(let langue of Object.keys(manga.chapters)){
            const path = manga.chapters[langue].map(chapter => {
                return {
                    params:{name:manga.titre, lang:langue, chapter:String(chapter)}
                }
            })
            paths = paths.concat(path)
        };
    })
    return{
        paths,
        fallback:true
    }
}

export async function getStaticProps({params}){
    const request = await fetch(`https://schildscans.pythonanywhere.com/api/mangas/scans/${params.name}/${params.lang}/${params.chapter}/?format=json`);
    const chapter = await request.json();
    return {
        props:{
            chapter
        },
        revalidate:30
    }
}

const Chapter = ({chapter:chapterObject}) => {
    const router = useRouter();

    const {name, lang, chapter} = router.query;
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [isLoading, setIsLoading] = useImmer({1:false, 2:false});
    const [autoPlayOn, setAutoPlayOn] = useState(false);
    const [timeoutTime, setTimeoutTime] = useState(7500);
    const [imageHeight, setImageHeight] = useImmer({1:null, 2:null});
    const [windowWidth, setWindowWidth] = useState(null);
    const [isOnline, setIsOnline] = useState(true);
    const timeoutID = useRef(null);

    const handleClick = function(){
        if(chapterObject.images.length - 2 != activePageIndex){
            setActivePageIndex(i => i + 1);
            handleLoading();
        }
        else if(chapterObject.hasNext){
            handleNextChapter();
        }
    }
    const handleClick2 = function(){
        if(activePageIndex != 0){
            setActivePageIndex(i => i - 1);
            handleLoading();
        }
    }
    const handleNextChapter = () => {
        router.push(`/scans/${name}/read/${lang}/${chapterObject.nextChapter}`);
    }
    const handleSelect = function(e){
        setActivePageIndex(parseInt(e.target.value));
        handleLoading();
    }

    const toggleAutoPlay = () => {
        setAutoPlayOn(!autoPlayOn);
    }
    const addOrDecreaseTimeout = (incrementor) => {
        if(timeoutTime + incrementor > 0){
            setTimeoutTime(t => t + incrementor)
        }
    }

    const handleLoading = function(){
        setIsLoading(draft => {
                        draft[1] = true;
                        draft[2] = true;
                    })
    }

    useEffect(() => {
        if(autoPlayOn){
            timeoutID.current = setTimeout(() => {
                if(chapterObject.images.length - 2 != activePageIndex){
                    setActivePageIndex(i => i + 1);
                    handleLoading();
                }
                else{
                    setAutoPlayOn(false); 
                }
            }, timeoutTime)
        }
        return () => {
            clearTimeout(timeoutID.current);
        }
    }, [autoPlayOn, activePageIndex, timeoutTime])

    useEffect(() => {
        function handleResize(){
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    const offlineListener = function(e){
            setIsOnline(false)
        }
    const onlineListener = function(e){
            setIsOnline(true);
    }
    useEffect(() => {
        window.addEventListener("offline", offlineListener);
        window.addEventListener("online", onlineListener);
        return () => {
            window.removeEventListener("offline", offlineListener);
            window.removeEventListener("online", onlineListener);
        }
    }, [])
    
    const langue = lang?.length == 2 ? "English" : lang
    const isMobile = windowWidth < 500
    return (
        <Fragment>
            <Head>
                <title>{name} Chapter {chapter} in English | SchildScans</title>
            </Head>
            <Robots description={`
Start reading the chapter ${chapter} of the manga ${ name } in ${langue} with SchildScans today.`} />
            
            <div className={styles.chapHeader}>
                <p>{lang}</p>
                <h1>{name}</h1>
                <p>{chapter}</p>
            </div>
            <nav className={styles.history}>
                <Link href="/">Home/</Link><Link href={`/scans/${name}`}>{name}/{lang}/</Link><Link href={`/scans/${name}/read/${lang}/${chapter}`}>{chapter}</Link>
            </nav>
            <form className={styles.selectChapter}>
                    {chapterObject?.hasPrev && (
                        <Link href={`/scans/${name}/read/${lang}/${chapterObject.prevChapter}`}>
                            <Image src="/prev.svg" quality={100}
                            width={30} height={30} />
                        </Link>
                    )}
                        
                    <select value={activePageIndex} onChange={handleSelect}>
                        {chapterObject?.images.map((value, index)=> {
                                if(index + 1 == chapterObject.images.length){
                                    return null;
                                }
                                return <option key={value} value={index}>Page {index + 1}</option>
                            })
                        }
                    </select>
                    {chapterObject?.hasNext && (
                        <Link href={`/scans/${name}/read/${lang}/${chapterObject.nextChapter}`}>
                            <Image src="/next.svg" quality={100}
                            width={30} height={30} />
                        </Link>
                    )}
                </form>
            <div style={{
                display:"flex", justifyContent:"center", marginBottom:"5px",
                cursor:"pointer", gap:"5px"
                }}>
                <Image src="/less.svg" onClick={() => {addOrDecreaseTimeout(-2500)}}
                width={30} height={30} />
                <Image src={!autoPlayOn ? "/playoff.svg" : "/playon.svg"} onClick={toggleAutoPlay} width={30} height={30} />
                <Image onClick={() => {addOrDecreaseTimeout(2500)}}
                src="/more.svg" width={30} height={30} />
            </div>
            <div className={styles.images}>
                <div style={{height:imageHeight[1]}} className={styles.left_cursor} onClick={handleClick2}></div>
                <div className={styles.page}>
                    <Image
                    alt={`Page ${activePageIndex + 1} of the chapter ${chapter} of ${name}`}
                    className={isLoading[1] && styles.isLoading} 
                    onLoadingComplete={e => {
                            setIsLoading(draft=>{draft[1] = false});
                            setImageHeight(draft => {
                                draft[1] = e.height;
                                if(isMobile){
                                    draft[2] = e.height;
                                }
                            })
                    }}
                    quality={75} 
                    src={chapterObject && (!isLoading[1] || isOnline) && chapterObject.images[activePageIndex]} width={400}
                    height={586} />
                    {isLoading[1] && 
                    <svg class="spinner" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5">

                        </circle>
                    </svg>
                    }
                </div>
                <div className={styles.page}>
                    <Image
                    alt={`Page ${activePageIndex + 2} of the chapter ${chapter} of ${name}`}
                    className={isLoading[2] && styles.isLoading}
                    onLoadingComplete={e => {
                        setIsLoading(draft=>{draft[2] = false});
                        if(!isMobile){
                            setImageHeight(draft => {
                                draft[2] = e.height;
                            })
                        }
                        
                        }}
                    quality={75} 
                    src={chapterObject && (!isLoading[2] || isOnline) && chapterObject.images[activePageIndex + 1]} width={400}
                    height={586} />
                    {isLoading[2] && 
                    <svg class="spinner" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5">

                        </circle>
                    </svg>
                    }
                </div>

                <Image alt={`Page ${activePageIndex + 3} of the chapter ${chapter} of ${name}`}  
                quality={75} src={chapterObject && chapterObject.images[activePageIndex + 2]} width={400}
                height={586} style={{display:"none"}} />
                
                <Image alt={`Page ${activePageIndex + 4} of the chapter ${chapter} of ${name}`}
                quality={75} src={chapterObject && chapterObject.images[activePageIndex + 3]} width={400}
                height={586} style={{display:"none"}} />
                
                <div style={{height:imageHeight[2]}} className={styles.right_cursor} onClick={handleClick}></div>
                
            </div>
            {!isOnline && <div className={styles.notif}>
                <Image src={"/error.svg"} quality={100} width={25} height={25} />
                <p>You're network is currently offline !</p>
            </div>}
        </Fragment>
    );
}
 
export default Chapter;