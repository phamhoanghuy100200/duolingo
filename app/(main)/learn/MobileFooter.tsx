'use client'
import { cn } from "@/lib/utils";

import SidebarItem from "./SidebarItem";

type Props = {
    className?: string;
}

const MobileFooter = ({ className }: Props) => {


    return (
        <footer className={cn("h-[85px] w-full bottom-0 border-t-4 sticky z-50 border-b items-center p-2", className)}>
            <div className="flex items-center justify-between w-full ">
                <SidebarItem small href="/learn" iconSrc="/learn.svg" label="Học" />
                <SidebarItem small href="/leaderboard" iconSrc="/leaderboard.svg" label="Bảng xếp hạng" />
                <SidebarItem small href="/quests" iconSrc="/quests.svg" label="Nhiệm vụ" />
                <SidebarItem small href="/shop" iconSrc="/shop.svg" label="Cửa hàng" />
            </div>
        </footer>
    );
}

export default MobileFooter;