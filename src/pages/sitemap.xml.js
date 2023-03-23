
export async function getServerSideProps({res}){
    const request = await fetch("https://schildscans.pythonanywhere.com/sitemapes.xml");
    const xml = await request.text();
    console.log(xml);
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
    return {
        props: {},
    };
}

const Sitemap = () => {
    return (
    <>
    </>
    )
}
export default Sitemap;
