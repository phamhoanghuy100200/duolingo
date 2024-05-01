'use client'

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean
}

const Header = ({ hearts, hasActiveSubscription, percentage }: Props) => {
    const { open, isOpen } = useExitModal();
    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7
        items-center  justify-between max-w-[1140px] mx-auto w-full
        ">
            <X onClick={open}
                className="text-slate-500 h-8 w-8 hover: opacity-75 transition cursor-pointer"
            />
            <Progress value={percentage} />
            <div className="text-red-500 flex items-center font-bold">
                <Image
                    src="/heart.svg"
                    height={30}
                    width={30}
                    alt="Heart"
                    className="mr-2"
                />
                {hasActiveSubscription
                    ?
                    <InfinityIcon />
                    :
                    <p className="font-extrabold">
                        {hearts}
                    </p>
                }

            </div>
        </header>
    );
}

export default Header;