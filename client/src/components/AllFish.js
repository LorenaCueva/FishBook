import FishContainer from "./FishContainer";
import AquariumContainer from "./AquariumContainer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import FishForm from "./FishForm";

function AllFish(){

    const { user } = useContext(UserContext);
    const [fishList, setFishList] = useState([]);
    const [seeAquariums, setSeeAquariums] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetch('/fish')
            .then(r => r.json())
            .then(fish => setFishList(fish))
            .catch(error => console.log(error))
        }
    },[])

    function handleOnSeeFish(id){
        id === seeAquariums ? setSeeAquariums(null) : setSeeAquariums(id)
    }

    function toggleShowForm(){
        setShowForm((showForm)=>!showForm)
    }

    function handleCreateFish(newFish){
        setFishList([newFish, ...fishList]);
    }

    if (showForm){
        return(
            <div>
                 <Title title={"Fish"}/>
                 <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">remove</i>Create New Fish</button></div>
                 <div className="row">
                    <div className="col s6 offset-s3">
                        <FishForm showForm={toggleShowForm} onCreateFish={handleCreateFish}/>
                    </div>
                </div> 
            </div>
        )
    }

    return(
        <div>
            <Title title={"Fish"}/>
            {!seeAquariums ? <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">add</i>Create New Fish</button></div> : null}
            <FishContainer fishList={fishList} seeAllFish={true} onSeeFish={handleOnSeeFish}/>
            {seeAquariums ? <AquariumContainer showAll={true} fishId={seeAquariums}/> : null}
        </div>
    );
}
export default AllFish;