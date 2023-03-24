export async function getServerSideProps({res}){
    res.setHeader('Content-Type', 'text/xml');
    const request = await fetch("https://schildscans.pythonanywhere.com/sitemapes.xml");
    res.write(await request.text());
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
