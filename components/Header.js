import Head from "next/head"

export default function Header() {
    return (
        <>
            <Head>
                <title>Private Area</title>
                <meta name="description" content="tutorial on private areas" />
                <link rel="icon" href="/accordion.ico" />
            </Head>
            <div id="header-bar">A Tiny Subscription Site</div>
        </>
    )
}
