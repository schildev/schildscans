
const generateSitemap = function(){
    return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
    <loc>https://schildscans.vercel.app/</loc>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/contact</loc>
    <changefreq>never</changefreq>
    <priority>0</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/report-issue</loc>
    <changefreq>never</changefreq>
    <priority>0</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/</loc>
    <lastmod>2022-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/En/6.5</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/6.5</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/En/7.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/7.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/8.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/9.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/10.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/11.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/12.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    <url>
    <loc>https://schildscans.vercel.app/scans/Ichiro Heian ! Volume 2/read/raw/13.0</loc>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
    </url>
    </urlset>
    `
}

export async function getServerSideProps({res}){
    res.setHeader('Content-Type', 'text/xml');
    res.write(generateSitemap());
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
