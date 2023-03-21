import Head from "next/head";
export const Norobots = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, follow" />
            </Head>
            <Head>
                <meta name="description" content="" />
            </Head>
            
        </>
    );
}

export const Robots = ({description}) => {
    return (
        <>
            <Head>
                <meta name="robots" content="index, follow"/>
            </Head>
            <Head>
                <meta name="description" content={description} />
            </Head>
            
        </>
    )
}