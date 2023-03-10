import FishContainer from "./FishContainer";
import { useEffect, useState } from "react";

function AquariumInfo({aquariumId, editable, allFish, onAddFish}){

    const [fishes, setFishes] = useState([]);
    const [addFish, setAddFish] = useState(false);
    const [errors, setErrors] = useState(null);
    const [waterType, setWaterType] = useState("");

    let displayErrors = null; 

    useEffect(()=>{
        fetch(`/aquaria/${aquariumId}/fish`)
        .then(r => r.json())
        .then(aquarium => {
            setWaterType(aquarium.water_type)
            setFishes(aquarium.housings)
        }
        )
        .catch(error => console.log(error))
    },[aquariumId])

    function toggleAddFish(){
        setAddFish(addFish => !addFish)
    }

    function handleAddFish(fishId, qty){
        setErrors(null);
        fetch(`/aquaria/${aquariumId}/housings`,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({aquarium_id: aquariumId, fish_id: fishId, qty: qty})
        })
        .then(r => {
            if(r.ok){
                r.json()
                .then(housing => {
                    const fishList = fishes.filter(fish => fish.id !== housing.id);
                    setFishes([housing, ...fishList]);
                    onAddFish(housing.aquarium);
                })
            }
            else{
                r.json()
                .then(error => {
                    setErrors(error.errors);
                    toggleAddFish();                
                })
            }
        })
    }

    function handleDeleteFish(housing){
        const newFishes = fishes.filter(fish => fish.id !== housing.id);
        setFishes(newFishes);
        onAddFish(housing.aquarium);
    }

    function handleEditFish(housing){
        const fishList = fishes.map(fish => fish.id === housing.id ? housing : fish);
        setFishes(fishList);
        onAddFish(housing.aquarium);
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>)
     }

    return(
        <div>
            {editable ? <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleAddFish}><i className="material-icons left">{addFish ? "remove" : "add"}</i>Add Fish</button></div> : null}
            <div>
                {displayErrors}
            </div>
            {addFish ? <FishContainer onAddFish={handleAddFish} canAddFish={waterType}/> : null}
            {<FishContainer fishList={fishes} editable={editable} onDeleteFish={handleDeleteFish} onEditFish={handleEditFish} />}
        </div>
    )
}
export default AquariumInfo;