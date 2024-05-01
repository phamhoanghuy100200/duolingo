import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    return (
        <div className="rounded-lg sticky top-0 bg-sky-400 px-4 py-4  flex flex-col items-start  border-b-2   lg:z-50">
            {/* <Link href="/sections" className="flex flex-row items-center">
                <ArrowLeft className="h-6 w-6 stroke-2 text-gray-300" />
                <h1 className="pl-2 font-bold text-lg text-gray-300">
                    KHÓA HỌC
                </h1>
            </Link>
            <h1 className="pt-1 font-bold text-xl text-white">
                {title}
            </h1> */}

        </div>
    );
}

export default Header;