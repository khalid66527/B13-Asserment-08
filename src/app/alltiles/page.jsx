
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TileClient from "@/components/TileClient";

const getTilesData = async () => {
    const res = await fetch('https://b13-assignment-08-server-1.onrender.com/tiles', { cache: 'no-store' });
    return res.json();
}

const AllTiles = async () => {
    const TilesData = await getTilesData();
    console.log("TilesData", TilesData);

    const session = await auth.api.getSession({
        headers: await headers()
    });

    console.log(session);
    const user = session?.user;

    if (!user) {
        redirect('/auth/signin');
        return <h2>Please SignIn</h2>;
    }

    return (
        <div className="min-h-screen bg-[#0B0D14] p-6 lg:p-10 font-sans">
        
            <TileClient initialTiles={TilesData} />
        </div>
    );
};

export default AllTiles;