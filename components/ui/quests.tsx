'use client'

import Image from "next/image";
import Link from "next/link";
import { Progress } from "./progress";

type Props = {
    points: number
}
const quests = [
    {
        title: "Earn 20 XP",
        value: 20,
    },
    {
        title: "Earn 50 XP",
        value: 50,
    },
    {
        title: "Earn 100 XP",
        value: 100,
    }
]
const Quests = ({ points }: Props) => {
    return (
        <div className="w-full flex flex-col gap-y-2 p-4 border-2 rounded-lg">
            <div className="flex items-center justify-between">
                <p className="font-extrabold text-lg text-neutral-700">Nhiệm vụ</p>
                <Link href="/quests">
                    <p className="font-extrabold text-lg text-sky-500">
                        Xem tất cả
                    </p>
                </Link>
            </div>
            <ul className="w-full mt-4">
                {quests.map((quest) => {
                    const progress = (points / quest.value) * 100;
                    return (
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2"
                            key={quest.title}
                        >
                            <Image
                                src="/point.svg"
                                alt="point"
                                width={60}
                                height={60}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-xl font-bold">
                                    {quest.title}
                                </p>
                                <Progress value={progress} className="h-3" />
                            </div>
                        </div>
                    )

                })}
            </ul>
        </div>
    );
}

export default Quests;