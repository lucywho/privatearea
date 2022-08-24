import { useRouter } from "next/router"
import Loading from "components/Loading"
import { getMarkdown } from "lib/markdown"
import { useSession } from "next-auth/react"

export default function Members({ markdown }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    if (loading) {
        return (
            <>
                <Loading />
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
