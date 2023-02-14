import FishContainer from "./FishContainer";
import { useEffect, useState } from "react";

function AquariumInfo({aquariumId, editable, allFish, onAddFish}){

    const [fishes, setFishes] = useState([]);
    const [addFish, setAddFish] = useState(false);
    const [errors, setErrors] = useState(null);

    let displayErrors = null;


    useEffect(()=>{
        fetch(`/aquariums/${aquariumId}`)
        .then(r => r.json())
        .then(fishes => {
            setFishes(fishes)}
        )
        .catch(error => console.log(error))
    },[aquariumId])

    function toggleAddFish(){
        setAddFish(addFish => !addFish)
    }

    function handleAddFish(fishId, qty){
        setErrors(null)
        fetch(`/aquariums/${aquariumId}/housings`,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({aquarium_id: aquariumId, fish_id: fishId, qty: qty})
        })
        .then(r => {
            if(r.ok){
                r.json()
                .then(newFish => {
                    const fishList = fishes.filter(fish => fish.id !== newFish.id);
                    setFishes([newFish, ...fishList]);
                    onAddFish(qty, aquariumId);
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

    function handleDeleteFish(id, qty){
        const newFishes = fishes.filter(fish => fish.id !== id);
        setFishes(newFishes);
        onAddFish(0 - Number(qty), aquariumId);
    }

    function handleEditFish(editFish){
        let total = 0
        const newFishes = fishes.map(fish => {
            if (fish.id === editFish.id){
                total -= Number(fish.qty);
                return editFish
            }
            return fish})
        setFishes(newFishes);
        onAddFish(total + editFish.qty, aquariumId);
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>)
        console.log(displayErrors)
     }

    return(
        <div>
            {editable ? <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleAddFish}><i className="material-icons left">{addFish ? "remove" : "add"}</i>Add Fish</button></div> : null}
            <div>
                {displayErrors}
            </div>
            {addFish ? <FishContainer fishList={allFish} onAddFish={handleAddFish} canAddFish={true}/> : null}
            {<FishContainer fishList={fishes} editable={editable} onDeleteFish={handleDeleteFish} onEditFish={handleEditFish} />}
        </div>
    )
}
export default AquariumInfo;