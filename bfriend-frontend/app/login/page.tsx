import Particles from "@/components/ui/particles";
import DevLoginform from "@/app/login/login-form";
export default function page() {
    // @ts-ignore
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
                    <div className={"text-7xl font-semibold w-full mt-7 pb-14 text-center"}>Login</div>
                        <DevLoginform />
                </div>
            </div>
        </main>
    );
}