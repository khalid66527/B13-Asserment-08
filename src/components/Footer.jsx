import Link from "next/link";

// --- SVG Icons ---
const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);

const LocationIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

// --- Footer Component ---
const Footer = () => {
    return (
        <footer className="bg-[#0B0D14] pt-20 pb-10 font-sans">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    
                    {/* Column 1: Brand & Description */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6B4DFF] font-bold text-white">
                                T
                            </div>
                            <span className="text-[22px] font-bold tracking-wide text-white">Tiles Gallery</span>
                        </div>
                        <p className="text-[14px] leading-relaxed text-[#94A3B8] pr-4">
                            Explore our beautifully curated tiles gallery. Discover modern designs,
        textures, and patterns that bring elegance and style to every space.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div>
                        <h3 className="mb-6 text-[16px] font-bold text-white">Explore</h3>
                        <ul className="flex flex-col gap-4 text-[14px] text-[#94A3B8]">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/allcourses" className="hover:text-white transition-colors">All Courses</Link></li>
                            <li><Link href="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-[16px] font-bold text-white">Contact Us</h3>
                        <ul className="flex flex-col gap-5">
                            {/* Email */}
                            <li className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111827]">
                                    <MailIcon className="h-5 w-5 text-[#3B82F6]" />
                                </div>
                                <span className="text-[14px] text-[#94A3B8]">khalidhasan678954321@gmail.com</span>
                            </li>
                            {/* Phone */}
                            <li className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E142B]">
                                    <PhoneIcon className="h-5 w-5 text-[#A855F7]" />
                                </div>
                                <span className="text-[14px] text-[#94A3B8]">+880 123 456 789</span>
                            </li>
                            {/* Location */}
                            <li className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#271414]">
                                    <LocationIcon className="h-5 w-5 text-[#F97316]" />
                                </div>
                                <span className="text-[14px] text-[#94A3B8]">Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Socials */}
                <div className="mt-16 flex flex-col items-center justify-between border-t border-[#1F2436]  ">
                    <p className="text-[14px] pt-5 text-[#94A3B8]">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">SkillSphere</span>. All rights reserved.
                    </p>
                    
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;