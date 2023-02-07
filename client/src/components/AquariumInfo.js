import FishContainer from "./FishContainer";
import { useEffect, useState } from "react";

function AquariumInfo({aquariumId, editable, allFish, onAddFish}){

    const [fishes, setFishes] = useState([]);
    const [addFish, setAddFish] = useState(false);


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
        fetch(`/aquariums/${aquariumId}/housings`,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({aquarium_id: aquariumId, fish_id: fishId, qty: qty})
        })
        .then(r => r.json())
        .then(newFish => {
            setFishes([newFish, ...fishes])
            onAddFish(qty);
        })
        .catch(error => console.log(error))
        console.log(fishes)
    }

    function handleDeleteFish(id, qty){
        const newFishes = fishes.filter(fish => fish.id !== id);
        setFishes(newFishes);
        onAddFish(0 - Number(qty));
    }

    function handleEditFish(editFish){
        let tot = 0
        const newFishes = fishes.map(fish => {
            if (fish.id == editFish.id){
                tot -= Number(fish.qty);
                return editFish
            }
            return fish})
        setFishes(newFishes);
        onAddFish(tot + editFish.qty);
    }


    return(
        <div>
            {editable ? <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleAddFish}><i className="material-icons left">{addFish ? "remove" : "add"}</i>Add Fish</button></div> : null}
            {addFish ? <FishContainer fishList={allFish} onAddFish={handleAddFish} canAddFish={true}/> : null}
            {<FishContainer fishList={fishes} editable={editable} onDeleteFish={handleDeleteFish} onEditFish={handleEditFish} />}
        </div>
    )
}
export default AquariumInfo;