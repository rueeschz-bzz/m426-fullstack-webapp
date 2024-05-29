"use client"
import Image from "next/image";
import IconCloud from "@/components/ui/icon-cloud";
import {NextUIProvider} from "@nextui-org/react";
import Navbarprod from "@/components/ui/navbar"


export default function Home() {
  return (
    <NextUIProvider>
    <Navbarprod></Navbarprod>
    <main className="flex min-h-screen flex-col bg-white items-center justify-between p-24">

    </main>
    </NextUIProvider>
  );
}
