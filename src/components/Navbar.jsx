'use client'
import { signOut, useSession } from "@/lib/auth-client";
import {  Link } from "@heroui/react";

const Navbar = () => {
    const { data, ispending } = useSession();
    if (ispending) {
        return <div>Loading...</div>
    }

    console.log('Session data in Navbar', data);

    const user = data?.user;

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">

                <div className="flex flex-1 items-center gap-3">
                    <Link href="/" className="font-bold text-xl text-foreground hover:opacity-80 transition-opacity">
                        ACME
                    </Link>
                </div>

                <ul className="flex items-center justify-center gap-6 font-medium">
                    <li><Link href="/" color="foreground" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/alltiles" color="foreground" className="hover:text-primary transition-colors">All Tiles</Link></li>
                    {/* <li><Link href="/profile" color="foreground" className="hover:text-primary transition-colors">My Profile</Link></li> */}
                </ul>


                <div className="flex flex-1 items-center justify-end gap-4">
                    {user ? (
                        <>

                            <Link href="/profile" className="transition-transform hover:scale-105">

                                {user.image ? (
                                    <img 
                                        src={user.image} 
                                        alt={user.name || "Profile"} 
                                        className="h-8 w-8 rounded-full object-cover border-2 border-primary"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                        {(user.name || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-3 rounded-xl"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                color="foreground"
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/80"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

            </header>
        </nav>
    );
};

export default Navbar;