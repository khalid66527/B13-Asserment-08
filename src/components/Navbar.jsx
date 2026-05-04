'use client'
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { Link } from "@heroui/react";

const Navbar = () => {
    const { data, ispending } = useSession();
    // মোবাইল মেনু টগল করার জন্য state
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (ispending) {
        return <div>Loading...</div>
    }

    const user = data?.user;

    return (
        <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
            <header className="flex h-16 items-center justify-between px-4 md:px-6">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Link 
                        href="/" 
                        className="no-underline text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-transform duration-300"
                    >
                        Tiles Gallery 
                    </Link>
                </div>

                {/* Desktop Navigation Links (Hidden on mobile) */}
                <ul className="hidden md:flex items-center justify-center gap-6 font-medium">
                    <li><Link href="/" className="no-underline hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/alltiles" className="no-underline hover:text-primary transition-colors">All Tiles</Link></li>
                    <li><Link href="/profile" className="no-underline hover:text-primary transition-colors">My Profile</Link></li>
                </ul>

                {/* Desktop User/Auth Section (Hidden on mobile) */}
                <div className="hidden md:flex items-center justify-end gap-4">
                    {user ? (
                        <>
                            <Link href="/profile" className="no-underline transition-transform hover:scale-105">
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
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-3 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                className="no-underline text-sm font-medium hover:text-primary transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="no-underline rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/80"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button (Visible only on mobile) */}
                <button 
                    className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        // Close Icon
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger Icon
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </header>

            {/* Mobile Navigation Menu (Shows when toggled) */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col bg-background/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-4 py-4 gap-4 shadow-lg absolute w-full">
                    <ul className="flex flex-col gap-4 font-medium">
                        <li><Link href="/" className="no-underline hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link href="/alltiles" className="no-underline hover:text-primary" onClick={() => setIsMenuOpen(false)}>All Tiles</Link></li>
                        <li><Link href="/profile" className="no-underline hover:text-primary" onClick={() => setIsMenuOpen(false)}>My Profile</Link></li>
                    </ul>
                    
                    <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <Link href="/profile" className="flex items-center gap-3 no-underline" onClick={() => setIsMenuOpen(false)}>
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
                                    <span className="font-medium text-sm text-foreground">My Profile</span>
                                </Link>
                                <button
                                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1.5 px-4 rounded-xl hover:opacity-90 transition-opacity w-fit"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/auth/signin"
                                    className="no-underline text-sm font-medium text-foreground hover:text-primary transition-colors text-center py-2 border border-primary/30 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="no-underline rounded-md bg-primary px-4 py-2 text-sm text-white text-center transition-colors hover:bg-primary/80"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;