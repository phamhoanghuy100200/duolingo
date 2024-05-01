import { Button } from "@/components/ui/button";

const ButtonPage = () => {
    return (
        <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>Primary</Button>
            <Button variant="ghost">ghost</Button>


            <Button variant="primary">Primary</Button>
            <Button variant="primaryOutline">Primary outline</Button>

            <Button variant="secondary">secondary</Button>
            <Button variant="secondaryOutline">secondary outline</Button>
            <Button variant="danger">secondary</Button>
            <Button variant="dangerOutline">secondary outline</Button>

            <Button variant="super">secondary</Button>
            <Button variant="superOutline">secondary outline</Button>

            <Button variant="sidebar">secondary</Button>
            <Button variant="sidebarOutline">secondary outline</Button>
        </div>
    );
}

export default ButtonPage;