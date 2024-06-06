import Particles from "@/components/ui/particles";

export default function page(){
    return(
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
        <div className={"flex -z-50 justify-center h-screen items-center my-auto mx-auto"}>
            <div className={"h-[36rem] bg-polar4 rounded-2xl w-[32rem] shadow-2xl"}>
                <form className={"h-[36rem] flex-none"}>
                    <label>Test</label>
                    <input className={"input transition ease-in-out focus:border-frost2 z-50"} disabled={false} placeholder={"Username"}></input>
                    <input className={"input transition ease-in-out focus:border-frost2 z-50"} disabled={false} placeholder={"Password"}></input>

                </form>

            </div>
        </div>

    </main>
    )
};
