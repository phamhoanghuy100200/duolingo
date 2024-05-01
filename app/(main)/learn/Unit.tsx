'use client'

import { lessons, units } from "@/db/schema";
import UnitBanner from "./UnitBanner";
import LessonButton from "./LessonButton";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[];
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    } | undefined;
    activeLessonPercentage: number;
}

const Unit = ({ id, title, lessons, description, activeLesson, activeLessonPercentage }: Props) => {
    return (
        <div>
            <UnitBanner title={title} description={description} />
            <div className="flex flex-col items-center relative ">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;
                    return (
                        <div key={lesson.id}>
                            <LessonButton
                                key={lesson.id}
                                id={lesson.id}
                                index={index}
                                totalCount={lessons.length - 1}
                                locked={isLocked}
                                current={isCurrent}
                                percentage={activeLessonPercentage}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Unit;