'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
type Props = {
    className?: string;
}
const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("h-full hidden md:flex flex-col px-4  top-0 left-0 border-r-2  md:w-[90px] lg:w-[256px] fixed", className)}>

            <Link href="/learn">
                <div className="hidden lg:block py-8 pl-3">
                    <Image alt="logo" src="/duolingo.svg" width={128} height={30} />
                </div>
                <div className="block lg:hidden py-8 ">
                    <Image alt="logo" src="/logo.svg" width={128} height={30} />
                </div>
            </Link>
            <div className="hidden lg:flex flex-col gap-y-2 flex-1">
                <SidebarItem href="/learn" iconSrc="/learn.svg" label="Học" />
                <SidebarItem href="/leaderboard" iconSrc="/leaderboard.svg" label="Bảng xếp hạng" />

                <SidebarItem href="/quests" iconSrc="/quests.svg" label="Nhiệm vụ" />
                <SidebarItem href="/shop" iconSrc="/shop.svg" label="Cửa hàng" />

            </div>
            <div className="flex lg:hidden flex-col gap-y-2 flex-1 items-center">
                <SidebarItem small href="/learn" iconSrc="/learn.svg" label="Học" />
                <SidebarItem small href="/leaderboard" iconSrc="/leaderboard.svg" label="Bảng xếp hạng" />

                <SidebarItem small href="/quests" iconSrc="/quests.svg" label="Nhiệm vụ" />
                <SidebarItem small href="/shop" iconSrc="/shop.svg" label="Cửa hàng" />

            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>



        </div>
    );
}

export default Sidebar;