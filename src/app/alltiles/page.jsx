import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";




const AllTiles = async() => {
    const session =await auth.api.getSession({
        headers : await headers()
    })

    console.log(session);
    const user = session?.user;
    if(!user){
        redirect('/auth/signin')
        return <h2>Please SignIn</h2>
    }
    return (
        <div>
            <h1>This is all tiles</h1>
        </div>
    );
};

export default AllTiles;