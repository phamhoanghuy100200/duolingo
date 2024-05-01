import { getTopTenUsers, getUserProgress } from "@/db/queries";
import StickyWrapper from "../learn/StickyWrapper";
import { redirect } from "next/navigation";
import UserProgress from "../learn/UserProgress";
import FeedWrapper from "../learn/FeedWrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Quests from "@/components/ui/quests";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const topTenUserData = getTopTenUsers();
    const [userProgress, topTenUser] = await Promise.all([
        userProgressData, topTenUserData
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
                <Quests points={userProgress.points} />

            </StickyWrapper>
            <FeedWrapper>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-5">

                        <Image src="/cup.svg" alt="cup" width={100} height={100} />
                        <div className="flex flex-col gap-y-2">
                            <p className="font-black text-3xl text-neutral-700">Bảng xếp hạng</p>
                            <p className=" font-bold text-neutral-700">See where you stand among other learners in the community</p>
                            <Separator className="mb-4 h-0.5 rounded-full " />
                            {topTenUser.map((userProgress, index) =>
                            (
                                <div key={userProgress.userId}
                                    className="flex items-center w-full p-2 px-4 rounded-xl
                                hover:bg-gray-200/50
                                "
                                >
                                    <p className="font-bold text-lime-700 mr-4">
                                        {index + 1}
                                    </p>
                                    <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                                        <AvatarImage
                                            className="object-cover"
                                            src={userProgress.userImageSrc}
                                        />
                                    </Avatar>
                                    <p className="font-bold text-neutral-800 flex-1">{userProgress.userName}</p>
                                    <p className="text-muted-foreground">{userProgress.points} XP</p>

                                </div>

                            )
                            )}
                        </div>
                    </div>


                </div>
            </FeedWrapper>
        </div>
    );
}

export default LeaderboardPage;