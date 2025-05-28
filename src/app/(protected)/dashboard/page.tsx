import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/authentication");
    }

    const clinics = await db.query.usersToClinicsTable.findMany({
        where: eq(usersToClinicsTable.userId,
            session.user.id
        ),
    });
    if (clinics.length === 0) {
        redirect("/clinic-form");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <p className="text-lg">Welcome to your dashboard, {session?.user?.name}</p>
                <SignOutButton />
            </div>
        </div>
    );
}
export default DashboardPage;