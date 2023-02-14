import FishContainer from "./FishContainer";
import AquariumContainer from "./AquariumContainer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllFish({seeAllFish, user}){

    const [seeAquariums, setSeeAquariums] = useState(null);
    const [fishes, setFishes] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetch('/fish')
            .then(r => r.json())
            .then(fishes => setFishes(fishes))
            .catch(error => console.log(error))
        }
    },[navigate, user])

    function handleOnSeeFish(id){
        id === seeAquariums ? setSeeAquariums(null) : setSeeAquariums(id)
    }

    return(
        <div>
            <FishContainer fishList={fishes} seeAllFish={seeAllFish} onSeeFish={handleOnSeeFish}/>
            {seeAquariums ? <AquariumContainer user={user} showAll={true} fishId={seeAquariums}/> : null}
        </div>
    );
}
export default AllFish;