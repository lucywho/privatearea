import { useEffect } from "react"
import { useRouter } from "next/router"
import Loading from "components/Loading"
import { useSession } from "next-auth/react"

export default function Success() {
    const router = useRouter()
    const { session_id } = router.query
    const { data: session, status } = useSession()
    const loading = status === "loading"

    useEffect(() => {
        const call = async () => {
            await fetch("/api/stripe/success", {
                method: "POST",
                body: JSON.stringify({
                    session_id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            window.location = "/members"
        }

        call()
    }, [])

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

    // if (!session.user.isSubscriber) {
    //     router.push("/join")
    //     return
    // }
}

export async function getServerSideProps(context) {
    return {
        props: {},
    }
}
