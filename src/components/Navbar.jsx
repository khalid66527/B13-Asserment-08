'use client'
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, Link } from "@heroui/react";

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

                {/* Left: Website Logo (Navigates to Home) */}
                <div className="flex flex-1 items-center gap-3">
                    <Link href="/" className="font-bold text-xl text-foreground hover:opacity-80 transition-opacity">
                        ACME
                    </Link>
                </div>

                {/* Centre: Links for Home, All Tiles, and My Profile */}
                <ul className="flex items-center justify-center gap-6 font-medium">
                    <li><Link href="/" color="foreground" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/alltiles" color="foreground" className="hover:text-primary transition-colors">All Tiles</Link></li>
                    {/* <li><Link href="/profile" color="foreground" className="hover:text-primary transition-colors">My Profile</Link></li> */}
                </ul>

                {/* Right: Auth actions depending on Login state */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    {user ? (
                        <>
                            {/* If Logged In: User Profile Page and a "Logout" button */}
                            <Link href="/profile" className="transition-transform hover:scale-105">
                                {/* HeroUI এর Avatar এর বদলে সাধারণ <img> ট্যাগ */}
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
                                className="rounded-md bg-danger px-4 py-2 text-sm text-danger-foreground transition-colors hover:bg-danger/80"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* If Logged Out: A "Login" button (and SignUp kept for completeness) */}
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