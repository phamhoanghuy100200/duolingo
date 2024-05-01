"use server"
import db from "@/db/drizzle";
import { getCoursesById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const POINTS_TO_REFULL = 10;
export const upsertUserProgress = async (coursesId: number) => {
    const { userId } = await auth()
    const user = await currentUser()
    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCoursesById(coursesId);

    if (!course) {
        throw new Error("Course not found")
    }
    if (!course.units.length || !course.units[0].lessons.length) {
        throw new Error("Course is empty")
    }

    const existingUserProgress = await getUserProgress()
    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: coursesId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/heart.svg"
        })
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: coursesId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/heart.svg"
    })

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) {
        throw new Error("Challenge not found")
    }
    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.id, challengeId),
            eq(challengeProgress.userId, userId)
        ),
    })
    const isPractice = !!existingChallengeProgress;

    if (isPractice) {
        return { error: "pratice" }
    }
    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

    //TODO: Handle subscription

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" };
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);


}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User Progress not found");
    }
    if (currentUserProgress.hearts === 5) {
        throw new Error("Hearts are already full");
    }
    if (currentUserProgress.points < POINTS_TO_REFULL) {
        throw new Error("not enough points")
    }
    await db.update(userProgress).set({
        hearts: 5,
        diamonds: currentUserProgress.diamonds - POINTS_TO_REFULL,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath("/lesson");

}