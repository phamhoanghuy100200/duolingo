import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    diamond: number;
    hasActiveSubscription: boolean;
    points: number
}

const UserProgress = ({ activeCourse, hearts, diamond, hasActiveSubscription, points }: Props) => {
    return (
        <div className="flex items-center gap-x-2 w-full justify-between">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc} alt="usa" width={36} height={29} className="rounded-md" />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost">
                    <Image src="/diamond.svg" alt="diamond" width={28} height={28} className="rounded-md" />
                    <p className="ml-2  text-sky-500">{diamond}</p>
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost">
                    <Image src="/heart.svg" alt="heart" width={28} height={28} className="rounded-md" />
                    <p className="ml-2 text-red-500">{hearts}</p>
                </Button>
            </Link>

        </div>
    );
}

export default UserProgress;