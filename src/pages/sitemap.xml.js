
export async function getServerSideProps({res}){
    const request = await fetch("https://schildscans.pythonanywhere.com/sitemapes.xml");
    const xml = await request.text();
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
    return {
        props: {},
    };
}

const Sitemap = () => {
    return (<h2>Hello world</h2>);
}
export default Sitemap;