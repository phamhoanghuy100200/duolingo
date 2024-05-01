import { redirect } from "next/navigation";


import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import FeedWrapper from "./FeedWrapper";
import StickyWrapper from "./StickyWrapper";
import UserProgress from "./UserProgress";
import Unit from "./Unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import Quests from "@/components/ui/quests";


const LearnContent = async () => {
    const unitsData = getUnits();
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();

    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
        userProgressData, unitsData, courseProgressData, lessonPercentageData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }
    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">

            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    diamond={userProgress.diamonds}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
                <Quests points={userProgress.points} />
            </StickyWrapper>

            <FeedWrapper>
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                unit: typeof unitsSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}

                        />
                    </div>
                ))}

            </FeedWrapper>
        </div>
    );
}

export default LearnContent;