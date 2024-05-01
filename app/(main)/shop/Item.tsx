"use client"
import { refillHearts } from "@/actions/userProgress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const DIAMOND_TO_REFILL = 5;
type Props = {
    title: string;
    hearts: number;
    diamond: number;
    hasActiveSubscription: boolean;
}

const Item = ({ title, hearts, diamond }: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || diamond < DIAMOND_TO_REFILL) {
            return;
        }
        startTransition(() => {
            refillHearts().catch(() => toast.error("Something went wrong"))
        })
    }

    return (

        <div className=" mt-10 flex flex-col">
            <p className="mb-5  text-2xl font-extrabold text-neutral-700">
                {title}

            </p>
            <div className=" border-t-2 px-3 py-5 flex items-center gap-x-2 justify-between">
                <div className="max-h-[100px] max-w-[100px]">
                    <Image src="/healHeart.svg" width={200} height={200} alt="tim" />

                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-extrabold text-neutral-700">Hồi phục Trái tim</h1>
                    <p className="text-lg text-neutral-500">Lấp đầy trái tim để không phải lo lắng mắc lỗi sai trong bài học</p>
                </div>
                <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || diamond < DIAMOND_TO_REFILL} variant={"default"} size="lg">
                    {hearts === 5 ? "Đã Đầy"
                        : (
                            <div className="flex items-center">
                                <Image src="/diamond.svg" alt="diamond" height={20} width={20} />
                                <p>{DIAMOND_TO_REFILL}</p>

                            </div>
                        )
                    }

                </Button>

            </div>
        </div>




    );
}

export default Item;