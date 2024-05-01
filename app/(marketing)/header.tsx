import { Button } from "@/components/ui/button";
import { ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg  h-full mx-auto flex items-center justify-between ">
                <div className="flex pt-8 pb-7 pl-4 items-center gap-x-3">
                    <Image src="/duo.webp" alt="doo" height={40} width={40} className="rounded-md"></Image>

                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Duolingo</h1>
                </div>

                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal" afterSignInUrl="/learn"
                        afterSignUpUrl="/learn"
                    >
                        <Button size="lg" variant="ghost">
                            Sign in
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    );
}

export default Header;