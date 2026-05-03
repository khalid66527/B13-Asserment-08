"use client";
import { useSession } from "@/lib/auth-client";
import { Envelope, Gear } from "@gravity-ui/icons"; // আইকনগুলো ইমপোর্ট করা হয়েছে
import { Button } from "@heroui/react";

const ProfilePage = () => {
    const { data, isPending } = useSession();


    if (isPending) {
        return <div className="flex min-h-screen items-center justify-center text-white">Loading...</div>;
    }

    const user = data?.user;

    if (!user) {
        return <div className="flex min-h-screen items-center justify-center text-white">Please login to view your profile.</div>;
    }

    return (

        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0B0D14] p-4 font-sans">
            
            {/* Profile Card */}
            <div className="flex w-full max-w-[420px] flex-col items-center rounded-[2.5rem] bg-[#141824] p-10 shadow-2xl">

                <div className="relative mb-5">
                    <div className="h-28 w-28 rounded-full border-[3px] border-white p-1 ring-[3px] ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                        <img 
                            src={user.image || "https://ui-avatars.com/api/?name=" + (user.name || "U") + "&background=random"} 
                            alt={user.name || "Profile"} 
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* User Name */}
                <h1 className="mb-2 text-[26px] font-black tracking-wide text-[#3b82f6]">
                    {user.name || "User Name"}
                </h1>

                {/* User Email */}
                <div className="mb-8 flex items-center justify-center gap-2 text-[15px] font-medium text-gray-400">
                    <Envelope className="size-4 text-[#3b82f6]" />
                    <span>{user.email || "user@example.com"}</span>
                </div>

                {/* Update Profile Button */}
                <Button 
                    className="flex h-12 w-full max-w-[240px] items-center gap-3 rounded-xl bg-[#242D40] text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-[#2d374d]"
                >
                    <Gear className="size-5" />
                    Update Your Profile
                </Button>

            </div>
        </div>
    );
};

export default ProfilePage;