
import { cn } from "@/lib/utils";
import UserProgress from "./UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

type Props = {
    className?: string;
}

const MobileHeader = async ({ className }: Props) => {
    const userProgressData = getUserProgress();
    const [userProgress] = await Promise.all([
        userProgressData
    ])
    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }
    return (
        <nav className={cn("h-[50px] w-full  bg-white fixed top-0 z-50 border-b items-center", className)}>
            <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                diamond={userProgress.diamonds}
                points={userProgress.points}
                hasActiveSubscription={false}
            />
        </nav>
    );
}

export default MobileHeader;