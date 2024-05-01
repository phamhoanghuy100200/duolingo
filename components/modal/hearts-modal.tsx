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
import { useHeartsModal } from "@/store/use-hearts-modal";
export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }
    const onClick = () => {
        close();
        router.push("/shop")
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="heal.svg" alt="heal" height={120} width={120} />
                    </div>
                    <DialogDescription className="text-center font-extrabold text-2xl text-neutral-700">
                        Bạn đã hết tim! Hãy đi lấy vô hạn tim, hoặc mua thêm tim ở cửa hàng nào.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" size="lg" onClick={onClick} className="w-full font-extrabold">
                            Đi mua
                        </Button>
                        <Button
                            variant="primaryOutline" size="lg"
                            onClick={() => { close(); router.push("/learn") }}
                            className="w-full font-black">
                            Dừng lại
                        </Button>
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}