import { Button } from "@/components/ui/button";
import { ArrowLeft, NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string
}

const UnitBanner = ({ title, description }: Props) => {
    return (
        <div className="w-full rounded-lg  mt-6 bg-sky-500 px-4 py-4  flex justify-between  border-b-2   lg:z-50">

            <div className="space-y-2">
                <div className="flex">
                    <Link href="/lesson">
                        <ArrowLeft className="h-6 w-6 stroke-2 text-gray-200" />
                    </Link>

                    <h1 className="pl-2 font-bold text-lg text-gray-200 uppercase">
                        {title}
                    </h1>
                </div>
                <h1 className="pt-1 font-bold text-xl text-white">
                    {description}
                </h1>
            </div>
            <Link href="/" className="mt-4">
                <Button
                    size="default"
                    variant="primary"
                    className="active:border-b-2 border-2 border-b-4 "
                >
                    <NotebookText className="mr-0 md:mr-2" />
                    <p className="hidden md:block font-extrabold">Hướng dẫn</p>
                </Button>
            </Link>
        </div>
    );
}

export default UnitBanner;