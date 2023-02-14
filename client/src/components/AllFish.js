import FishContainer from "./FishContainer";
import AquariumContainer from "./AquariumContainer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllFish({fishList, allFish, user}){

    const [seeAquariums, setSeeAquariums] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[navigate, user])

    function handleOnSeeFish(id){
        id === seeAquariums ? setSeeAquariums(null) : setSeeAquariums(id)
    }

    return(
        <div>
            <FishContainer fishList={fishList} allFish={allFish} onSeeFish={handleOnSeeFish}/>
            {seeAquariums ? <AquariumContainer user={user} showAll={true} fishId={seeAquariums}/> : null}
        </div>
    );
}
export default AllFish;