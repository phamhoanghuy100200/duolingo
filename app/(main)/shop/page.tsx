import { getUserProgress } from "@/db/queries";
import StickyWrapper from "../learn/StickyWrapper";
import { redirect } from "next/navigation";
import UserProgress from "../learn/UserProgress";
import FeedWrapper from "../learn/FeedWrapper";
import Image from "next/image";
import Item from "./Item";
import Quests from "@/components/ui/quests";

const Shop = async () => {
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
                <Quests points={userProgress.points} />

            </StickyWrapper>
            <FeedWrapper>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-5">

                        <Image src="/shop.svg" alt="shop" width={100} height={100} />
                        <div className="flex flex-col gap-y-2">
                            <p className="font-black text-3xl text-neutral-700">Shop</p>
                            <p className=" font-bold text-neutral-700">Điểm đến của mọi nhà</p>

                        </div>
                    </div>
                    <Item
                        title="Trái tim"
                        hearts={userProgress.hearts}
                        diamond={userProgress.diamonds}
                        hasActiveSubscription={false}
                    />

                </div>
            </FeedWrapper>
        </div>
    );
}

export default Shop;