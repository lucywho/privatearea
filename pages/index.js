import Link from "next/link"
import Header from "components/Header"
import Loading from "components/Loading"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Home() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    if (loading) {
        return (
            <>
                <Header />
                <Loading />
            </>
        )
    }

    if (session) {
        router.push("/members")
        return null
    }

    return (
        <>
            <Header />
            <div className="text-center ">
                <h1 className=" mt-20 font-extrabold text-2xl">Private Area</h1>

                <p className="mt-10">Join the private area to have access to</p>

                <ol className="mt-10 list-inside list-decimal">
                    <li>The lyrics book in PDF</li>
                    <li>Exclusive 30% discount on the albums</li>
                    <li>Exclusive access to preorders</li>
                </ol>

                <p className="mt-10">Just $5/m</p>

                <div className="mt-10">
                    <Link
                        className="bg-black text-white px-5 py-2"
                        href="/api/auth/signin"
                    >
                        Become a supporter
                    </Link>
                </div>
            </div>
        </>
    )
}
