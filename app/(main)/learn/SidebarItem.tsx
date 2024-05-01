import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
    label: string;
    iconSrc: string;
    href: string;
    small?: boolean;
}

const SidebarItem = ({ label, iconSrc, href, small }: Props) => {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <>
            {small ? <Button size="default"
                variant={active ? "sidebarOutline" : "sidebar"}
                className="justify-center items-center h-[52px]"
            >
                <Link href={href} >
                    <Image src={iconSrc} alt={label} className="" height={40} width={40} />

                </Link>
            </Button>
                :

                <Button
                    variant={active ? "sidebarOutline" : "sidebar"}
                    className="justify-start h-[52px]"
                >
                    <Link href={href} className="flex flex-row justify-center items-center">
                        <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32} />
                        {label}
                    </Link>
                </Button>
            }



        </>

    );
}

export default SidebarItem;