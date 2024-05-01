import { auth } from "@clerk/nextjs";

const allowedIds = [
    "user_2fIa586AzKV5yHbhixeAReTyGLr",
]
export const isAdmin = () => {
    const { userId } = auth();
    if (!userId) {
        return false
    }

    return allowedIds.indexOf(userId) !== -1;
}