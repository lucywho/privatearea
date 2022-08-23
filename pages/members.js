import Header from "components/Header"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Members() {
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
            <div>
                <div className="text-center ">
                    <h1 className=" mt-20 font-extrabold text-2xl">
                        Private Area
                    </h1>

                    <p className="mt-10">Thank you for being a member</p>

                    <p className="mt-10">You now have access to:</p>

                    <ol className="mt-10 list-inside list-decimal">
                        <li>The lyrics book in PDF</li>
                        <li>Exclusive 30% discount on the albums</li>
                        <li>Exclusive access to preorders</li>
                    </ol>
                </div>
            </div>
        </>
    )
}
