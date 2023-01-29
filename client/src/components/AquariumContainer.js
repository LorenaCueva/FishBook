import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AquariumCard from "./AquariumCard";

function AquariumContainer({user}){

   const navigate = useNavigate();

    useEffect(() => {
        if(user == null){
            navigate("/login")
        }
    },[user, navigate])

    if (user){
        return(
            <div>
                <h1>
                    {user.username}'s FishBook
                </h1>
                <AquariumCard/>
            </div>
        )
    }
    else{
        return(
            <></>
        )
    }
}
export default AquariumContainer;