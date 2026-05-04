"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {

    const images = [
        "/image/banner1.avif",
        "/image/banner2.avif",
        "/image/banner3.avif",
        "/image/banner4.avif"
    ];

    const [current, setCurrent] = useState(0);

    const fullText = "Premium Tiles Gallery";
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        let timer;
        
        if (!isDeleting && displayText.length < fullText.length) {
            timer = setTimeout(() => {
                setDisplayText(fullText.slice(0, displayText.length + 1));
            }, 150); 
        } 
        else if (isDeleting && displayText.length > 0) {

            timer = setTimeout(() => {
                setDisplayText(fullText.slice(0, displayText.length - 1));
            }, 50); 
        } 
        else if (displayText.length === fullText.length) {
    
            timer = setTimeout(() => setIsDeleting(true), 2000); 
        } 
        else if (displayText.length === 0) {

            timer = setTimeout(() => setIsDeleting(false), 500);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, fullText]);

    return (
        <div className="relative h-[50vh] w-full overflow-hidden">
            

            <style>{`
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes textShine {
                    from { background-position: 200% center; }
                    to { background-position: -200% center; }
                }
                .animate-slide-up {
                    animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-shine {
                    background-size: 200% auto;
                    animation: textShine 4s linear infinite;
                }
                .blink-cursor {
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>

            {images.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    alt="tiles banner"
                    fill
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-1000 ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">

                <h1 className="mb-4  text-3xl font-extrabold md:text-7xl flex items-center justify-center min-h-[48px] md:min-h-[72px]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5A63FF] to-white animate-shine">
                        {displayText}
                    </span>
                    <span className="text-cyan-300 ml-1 blink-cursor">|</span>
                </h1>
            
                <p 
                    className="animate-slide-up mb-8 max-w-xl text-gray-300 md:text-lg" 
                    style={{ animationDelay: '0.2s', opacity: 0 }}
                >
                    Discover the best tiles for your next project. We provide premium quality, modern designs, and top-notch materials to elevate your space.
                </p>

                <div 
                    className="animate-slide-up flex gap-4" 
                    style={{ animationDelay: '0.4s', opacity: 0 }}
                >
                    <Link href="/alltiles">
                        <button className="rounded-xl bg-[#6B4DFF] px-8 py-3 font-semibold text-white transition-transform hover:scale-105">
                            Explore Now
                        </button>
                    </Link>

                    <Link href="/about">
                        <button className="rounded-xl border border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black">
                            Learn More
                        </button>
                    </Link>
                    
                </div>

            </div>
        </div>
    );
};

export default Banner;