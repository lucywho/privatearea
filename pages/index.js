import Link from "next/link"
import { useRouter } from "next/router"
import Loading from "components/Loading"
import { useSession } from "next-auth/react"

export default function Home() {
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

    if (session) {
        router.push("/members")
        return null
    }

    return (
        <>
            <div className="text-center ">
                <h1 className=" mt-20 font-extrabold text-2xl">Public Area</h1>
                <p className="mt-10"> ...there&apos;s not much here!</p>

                <p className="m-10">
                    Become a supporter and get access to the private
                    member&apos;s area, where you&apos;ll find:
                </p>

                <ol className="mt-10 list-inside list-decimal">
                    <li>Interesting Stuff</li>
                    <li>Exclusive Offers</li>
                    <li>News and Updates First</li>
                </ol>

                <p className="mt-10">Just €5/m</p>

                <div className="support">
                    <Link href="/api/auth/signin">Become a supporter</Link>
                </div>
            </div>
        </>
    )
}
