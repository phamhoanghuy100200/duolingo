import { getUserProgress } from "@/db/queries";
import StickyWrapper from "../learn/StickyWrapper";
import { redirect } from "next/navigation";
import UserProgress from "../learn/UserProgress";
import FeedWrapper from "../learn/FeedWrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
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
const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const [userProgress] = await Promise.all([
        userProgressData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }
    return (
        <div className="flex  flex-row-reverse gap-[48px] px-6">
            <StickyWrapper

            >
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                    diamond={userProgress.diamonds}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-5 w-full">

                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex items-center gap-x-4">
                                <Image src="/quests.svg" alt="quest" width={100} height={100} />
                                <div className="flex flex-col">
                                    <p className="font-black text-3xl text-neutral-700">Nhiệm vụ</p>
                                    <p className=" font-bold text-neutral-700">Completed quests by earning diamonds </p>
                                </div>

                            </div>

                            <ul className="w-full mt-4">
                                {quests.map((quest) => {
                                    const progress = (userProgress.points / quest.value) * 100;
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
                    </div>


                </div>
            </FeedWrapper>
        </div>
    );
}

export default QuestsPage;