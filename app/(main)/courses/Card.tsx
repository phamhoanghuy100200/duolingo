"use client"
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    id: number;
    title: string;
    imageSrc: string;
    onClick: (id: number) => void;
    disabled: boolean;
    active: boolean
}

const Card = ({ id, title, imageSrc, onClick, disabled, active }: Props) => {
    return (
        <div onClick={() => onClick(id)} className={cn(" border-2 h-full flex flex-col items-center  cursor-pointer min-h-[200px] rounded-xl w-[160px] md:w-[170px] hover:bg-black/5 active:border-b-2 px-4 py-4 ",
            disabled && "pointer-events-none opacity-50"
        )}>
            <div className="min-h-[28px] w-full flex items-center justify-end mb-4">
                {/* min-24 */}
                {active && (
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] h-4 w-4" />
                    </div>
                )}
            </div>
            <Image alt={title} src={imageSrc} height={90} width={70} />
            <p className="mt-4 font-bold text-base">
                {title}
            </p>
        </div>
    );
}

export default Card;