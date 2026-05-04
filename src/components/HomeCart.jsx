import Link from "next/link";

const getTilesData = async () => {
    const res = await fetch('http://localhost:5000/tiles', {
        cache: 'no-store' // লেটেস্ট ডাটা পাওয়ার জন্য
    })
    return res.json()
}

const HomeCart = async () => {

    const TilesData = await getTilesData()
    // কনসোল লগ রিমুভ করে দিয়েছি ক্লিন রাখার জন্য

    return (
        <div className="min-h-screen bg-[#0B0D14] p-6 lg:p-10 font-sans">
            <div className="w-10/12 mx-auto">

                {/* Header Section */}
                <div className="mb-10 border-b border-[#1F2436] pb-6">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A63FF] to-[#A940FF]">Tiles Collection</span>
                        </h1>
                        <p className="mt-2 text-sm text-[#94A3B8]">
                            Explore our top picks for your next project
                        </p>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {/* .slice(0, 12) ব্যবহার করে শুধুমাত্র প্রথম ১২টি ডাটা দেখানো হচ্ছে */}
                    {TilesData.slice(0, 12).map((tile) => (
                        <div
                            key={tile.id}
                            className="group relative flex flex-col overflow-hidden rounded-[24px] bg-[#11141F] border border-[#1F2436] transition-all duration-300 hover:-translate-y-2 hover:border-[#6B4DFF]/50 hover:shadow-[0_12px_40px_-15px_rgba(107,77,255,0.3)]"
                        >
                            {/* IMAGE SECTION */}
                            <div className="relative w-full h-56 overflow-hidden bg-[#181B27]">
                                <img
                                    src={tile.image}
                                    alt={tile.name || tile.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                                    {tile.category || 'Premium'}
                                </div>
                            </div>

                            {/* CONTENT SECTION */}
                            <div className="flex flex-1 flex-col p-6">

                                {/* Meta Info (Dimensions & Stock) */}
                                <div className="mb-3 flex items-center justify-between text-[13px] font-medium">
                                    <span className="text-[#64748B] bg-[#181B27] px-2.5 py-1 rounded-md border border-[#1F2436]">
                                        {tile.dimensions || 'Standard Size'}
                                    </span>
                                    {tile.inStock !== false ? (
                                        <span className="flex items-center gap-1.5 text-emerald-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-red-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[#6B4DFF] transition-colors">
                                    {tile.title}
                                </h2>

                                <div className="mt-auto flex items-center justify-between border-t border-[#1F2436] pt-5">

                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-0.5">
                                            Price
                                        </span>
                                        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                            {tile.currency} {tile.price}
                                        </span>
                                    </div>

                                    <Link href={`/alltiles/${tile.id}`}>
                                        <button className="flex items-center justify-center rounded-xl bg-[#181B27] border border-[#2D3142] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#5A63FF] group-hover:to-[#A940FF] group-hover:border-transparent group-hover:shadow-[0_0_15px_rgba(107,77,255,0.4)]">
                                            View Details
                                        </button>
                                    </Link>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* View All Tiles Button Section */}
                <div className="mt-14 flex justify-center">
                    <Link href="/alltiles">
                        <button className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#5A63FF] to-[#A940FF] px-10 py-4 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(107,77,255,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_-10px_rgba(107,77,255,0.8)]">
                            View All Tiles
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HomeCart;