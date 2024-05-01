import MobileFooter from "./learn/MobileFooter";
import MobileHeader from "./learn/MobileHeader";
import Sidebar from "./learn/sidebar";



type Props = {
    children: React.ReactNode
}

const LearnOutline = async ({ children }: Props) => {


    return (
        <>
            <MobileHeader className="flex md:hidden" />
            <Sidebar />
            <main className="pt-[50px] md:pt-0 md:pl-[90px] lg:pl-[256px] h-full ">
                <div className="max-w-[1056px] mx-auto pt-6 h-full">
                    {children}
                </div>

            </main>
            <MobileFooter className="flex md:hidden" />

        </>

    );
}

export default LearnOutline;