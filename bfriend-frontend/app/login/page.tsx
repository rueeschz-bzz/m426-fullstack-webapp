import Particles from "@/components/ui/particles";

export default function page() {
    return (
        <main className={"bg-snow1 h-screen"}>
            <div className={"z-0"}>
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color={"black"}
                    refresh
                />
            </div>
            <div
                className={
                    "flex relative z-50 justify-center h-screen items-center my-auto mx-auto"
                }
            >
                <div className={"h-[36rem] bg-polar4 rounded-2xl w-[32rem] shadow-2xl"}>
                    <div className={"text-7xl font-semibold w-full mt-7 pb-20 text-center"}>Login</div>
                    <form action={"api"} method={"POST"} encType={"application/json"} className={"h-[36rem] flex-none ml-10"}>
                        <label className={"text-xl"}>Username</label><br />
                        <input
                            type={"text"}
                            className={
                                "mt-2  input input-bordered caret-black text-black input-secondary w-full pr-5 z-50"
                            }
                            disabled={false}
                            placeholder={"Username"}
                        ></input><br />
                        <div className={"mt-16"}></div>
                        <label className={"text-xl"}>Password</label> <br />
                        <input type={"password"}
                            className={
                                "mt-2 input input-bordered caret-black input-secondary text-black w-full max-w-xs z-50"
                            }
                            disabled={false}
                            placeholder={"Password"}
                        ></input>
                    </form>
                </div>
            </div>
        </main>
    );
}