'use client'
import Confetti from "react-confetti"
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import Footer from "./Footer";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/userProgress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import ResultCard from "./ResultCard";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/practice-modal";

type Props = {
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[];
    initialHearts: number;
    initialPercentage: number;
    userSubcription: any;
}

const Quiz = (
    {
        initialLessonId,
        initialLessonChallenges,
        initialHearts,
        initialPercentage,
        userSubcription
    }
        : Props) => {

    const { open: openHeartsModal } = useHeartsModal()
    const { open: openPracticeModal } = usePracticeModal()

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal()
        }
    })
    const { width, height } = useWindowSize()
    const router = useRouter()

    const [correctAudio, _c, correctControls] = useAudio({ src: "/good_job.mp3" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/chicken.mp3" });

    const [pending, startTransition] = useTransition();
    const [lessonId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    })
    const [challenges] = useState(initialLessonChallenges);
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>()
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }


    const onSelect = (id: number) => {
        if (status !== "none") {
            return;
        }
        setSelectedOption(id)
    }

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        correctControls.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length)
                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("something went wrong. Please"))
            })

        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        incorrectControls.play()
                        setStatus("wrong");
                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0))
                        }

                    })
                    .catch(() => toast.error("something went wrong"))
            })
        }

    }

    if (!challenge) {
        return (
            <>
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                    className="overflow-x-hidden"
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg
                mx-auto text-center items-center justify-center h-full
                ">
                    <Image
                        src="/congratulation.png"
                        alt="congratulation"
                        width={300}
                        height={300}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job<br /> You are completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 5}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer onCheck={() => router.push("/learn")} status="completed" lessonId={lessonId} />
            </>

        )
    }
    const title = challenge.type === "ASSIST"
        ? "Select the correct meaning"
        : challenge.question;
    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubcription?.isActive}

            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] md:w-[600px] md:min-h-[350px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}

            />
        </>
    );
}

export default Quiz;