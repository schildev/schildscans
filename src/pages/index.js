import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Scanlist from '@/components/Scanlist'
import { Robots } from '@/components/Robots';

export async function getStaticProps() {
  const request = await fetch("https://schildscans.pythonanywhere.com/api/mangas");
  const mangas = await request.json();
  return {
    props:{
      mangas
    },
    revalidate:30
  }
}

export default function Home({mangas}) {
  return (
    <>
    <Head>
      <title>SchildScans - Your Go-To Source for Manga Translations in English</title>
    </Head>
    <Robots description={"Discover the world of manga like never before with SchildScans and totally for free, your go-to source for translations in English and Raw, including Comedy, Romance, Trip, and Shonen genres. Explore our extensive collection today and start reading your next obsession!"} />
    <div className={styles.content}>
      <h1 style={{fontFamily:"Comfortaa", marginLeft:"10px",marginBottom:"0", fontSize:"clamp(14px, 25px, 32px)"}}>Schilscans Manga Translations in English</h1>
      <p style={{fontFamily:"Cabin", marginLeft:"10px", fontSize:"clamp(12x, 18px, 24px)", marginTop:"10px"}}>
      Welcome to SchildScans, your freely manga translations in English, including Comedy, Romance, Trip, and Shonen genres.
      <br/>
      With a user-friendly website design and easy-to-navigate interface, so need to wait and start exploring our collection today and discover our translations !.
      </p>
      <h2 className="center dosis">Latests manga translated</h2>
      <Scanlist scans={mangas} />
    </div>
    </>
  )
}
