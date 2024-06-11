"use client"
/*
Stuff still broken, form submission not working
*/
import { useRouter } from "next/navigation"
import {useEffect, useState} from "react"

export default function DevLoginform () {

    const router = useRouter()

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const login= {username, password}
        console.log("submitted")
        try{
        const res = fetch("localhost:9000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(login)


        })

            if (res.status === 202) {
                router.refresh()
                router.push("/")
            }
            else if(res.status === 404){
                router.refresh()
                router.push("/signup")
            }
            else {
                router.refresh()
                router.push("/")

            }

        }
        catch (e: any | unknown) {
            console.log(e)

        }


    }




    return (
        <form onSubmit={handleSubmit}  className={"h-[36rem] flex-none ml-10"}>
            <label className={"text-xl"}>Username</label><br />
            <input
                required={true}
                onChange={(e)=> setusername(e.target.value)}
                value={username}
                type={"text"}
                className={
                    "mt-2 input input-bordered caret-black input-secondary text-black w-full max-w-xs z-50"
                }
                disabled={false}
                placeholder={"Username"}
            ></input><br />
            <div className={"mt-16"}></div>
            <label className={"text-xl"}>Password</label> <br />
            <input
                required={true}
                onChange={(e)=> setpassword(e.target.value)}
                value={password}
                type={"password"}
                   className={
                       "mt-2 input input-bordered caret-black input-secondary text-black w-full max-w-xs z-50"
                   }
                   disabled={false}
                   placeholder={"Password"}
            ></input> <br />
            <div className={"mt-5 flex my-auto justify-items-center"}>
                <button type={"submit"}
                    disabled={isLoading}

                className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group active:scale-90 transition-transform"
            >
                    {isLoading && <span>Good</span>}
                    {!isLoading && <span>Log in</span>}

                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"
                ></span>
                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"
                ></span>
                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"
                ></span>
                <span
                    className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                >Yes do it</span
                >
            </button></div>

        </form>
    )
}