"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePracticeModal } from "@/store/practice-modal";
export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    // useEffect(() => setIsClient(true), []);

    // if (!isClient) {
    //     return null;
    // }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/heart.svg" alt="hearts" height={120} width={120} />
                    </div>
                    <DialogDescription className="text-center font-extrabold text-2xl text-neutral-700">
                        Thực hành lại bài học để nhận lại tim. Bạn không thể nhận thưởng khi thực hành lại bài học.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" size="lg" onClick={close} className="w-full font-extrabold">
                            Tôi đã hiểu
                        </Button>

                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}