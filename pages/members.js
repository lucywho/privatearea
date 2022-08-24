import Header from "components/Header"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { getMarkdown } from "lib/markdown"

export default function Members({ markdown }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    if (loading) {
        return (
            <>
                <Header />
                <p>loading . . . </p>
            </>
        )
    }

    if (!session) {
        router.push("/")
        return
    }

    if (!session.user.isSubscriber) {
        router.push("/join")
        return
    }

    return (
        <>
            <Header />
            <div className="text-center ">
                <h1 className=" mt-20 font-extrabold text-2xl">Private Area</h1>
                <div
                    className="markdown"
                    dangerouslySetInnerHTML={{ __html: markdown }}
                />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const markdown = await getMarkdown()

    return {
        props: {
            markdown,
        },
    }
}
