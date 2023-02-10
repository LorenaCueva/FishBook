import FishContainer from "./FishContainer";
import AquariumContainer from "./AquariumContainer";
import { useState } from "react";

function AllFish({fishList, allFish, user}){

    const [seeAquariums, setSeeAquariums] = useState(null)

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