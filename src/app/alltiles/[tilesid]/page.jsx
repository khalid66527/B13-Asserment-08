import Link from "next/link";

const TileDetails = async ({ params }) => {
    const { tilesid } = await params;
    const res = await fetch(`https://b13-assignment-08-server-1.onrender.com/tiles/${tilesid}`);
    const tile = await res.json();

    if (!tile || !tile.title) {
        return (
            <div className="min-h-screen bg-[#0B0D14] flex flex-col items-center justify-center text-white">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Tile Not Found!</h1>
                <Link href="/alltiles" className="text-blue-400 hover:underline">Go Back to Gallery</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0D14] p-6 lg:p-12 font-sans">
            <div className="max-w-6xl mx-auto">


                <Link href="/alltiles" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white mb-8 transition-colors font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to All Tiles
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#11141F] border border-[#1F2436] p-6 sm:p-10 rounded-[32px] shadow-2xl">


                    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden bg-[#181B27] border border-[#2D3142]">
                        <img
                            src={tile.image}
                            alt={tile.name || tile.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />

                        <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                            {tile.inStock !== false ? (
                                <span className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]"></span>
                                    In Stock
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-sm font-bold text-red-400">
                                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                                    Out of Stock
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="flex flex-col justify-center">


                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-[#6B4DFF]/15 text-[#6B4DFF] border border-[#6B4DFF]/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                                {tile.category || "Premium"}
                            </span>
                            <span className="bg-[#2D3142]/50 text-gray-300 border border-[#2D3142] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                Material: {tile.material || "Standard"}
                            </span>
                        </div>


                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                            {tile.name || tile.title}
                        </h1>
                        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8">
                            {tile.description}
                        </p>


                        <div className="flex items-center gap-6 sm:gap-12 bg-[#181B27] border border-[#2D3142] rounded-2xl p-6 mb-8">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-1">Total Price</span>
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    {tile.currency} {tile.price}
                                </span>
                            </div>
                            <div className="w-px h-12 bg-[#2D3142]"></div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-1">Dimensions</span>
                                <span className="text-xl font-bold text-white">
                                    {tile.dimensions}
                                </span>
                            </div>
                        </div>


                        <div className="flex gap-4 mt-auto">
                            <button className="flex-1 bg-gradient-to-r from-[#5A63FF] to-[#A940FF] py-4 rounded-xl text-white font-bold text-lg shadow-[0_10px_20px_-10px_rgba(107,77,255,0.6)] hover:scale-[1.02] transition-transform duration-300">
                                Add to Cart
                            </button>
                            <button className="px-6 border border-[#2D3142] bg-[#181B27] rounded-xl text-white font-bold hover:bg-[#2D3142] transition-colors">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-pink-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TileDetails;