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
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/sad-icon.svg" alt="sad-ico" height={120} width={120} />
                    </div>
                    <DialogDescription className="text-center font-extrabold text-2xl text-neutral-700">
                        Đợi chút, đừng đi mà! Bạn sẽ mất hết tiến trình của bài học này nếu thoát bây giờ
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" size="lg" onClick={close} className="w-full font-extrabold">
                            Tiếp Tục học
                        </Button>
                        <Button variant="dangerOutline" size="lg" onClick={() => { close(); router.push("/learn") }} className="w-full font-black">
                            Dừng lại
                        </Button>
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}