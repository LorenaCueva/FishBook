import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
import { useNavigate } from "react-router-dom";

function FishContainer({aquariumId = null, editable = false, addFish = false}){

    const [fishes, setFishes] = useState([]);
    const [canAddFish, setCanAddFish] = useState(false);

    // const navigate = useNavigate();

    useEffect(()=>{
        if(aquariumId){
            fetch(`/aquariums/${aquariumId}`)
            .then(r => r.json())
            .then(fishes => {
                setFishes(fishes)}
                )
            .catch(error => console.log(error))
        }
        else{
        fetch("/fish")
        .then(r => r.json())
        .then(fishes => setFishes(fishes))
        .catch(error => console.log(error))
        }
    },[aquariumId])

    function handleDeleteFish(id){
        const newFishes = fishes.filter(fish => fish.id !== id);
        setFishes(newFishes);
    }

    const fishesToRender = fishes.map(fish => <FishCard key={fish.id}fish={fish} editable={editable} onDelete={handleDeleteFish} canAddFish={addFish}/>)

    console.log("fishes", fishes)

    function setCards(arr){
        let aux = null;
        let res = [];
        if(arr.length > 3 && arr.length % 2 == 0){
            aux = arr.pop()
        }
        for(let i = 0; i < arr.length; i = i+3){
            res.push(<FishCardRow key={i} card1={arr[i]} card2={arr[i+1]} card3={arr[i+2]}/>)
        }
        if(aux){
            res.push(<div className="row" key={arr.length}><div className="col s4">{aux}</div></div>)
        }
        return res
    }

    function toggleAddFish(){
        setCanAddFish((canAddFish) => !canAddFish);        
    }
console.log("canAdd", canAddFish)

    return (
       
        <div>
            {/* {fishes.length != 0 ? <h5>Fish!</h5> :  <h5>No Fish!</h5>} */}
            {canAddFish || editable ?  <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleAddFish}><i className="material-icons left">add_box</i>Add Fish</button></div> : null}
            {canAddFish ? <FishContainer addFish={true}/> : null}
            {setCards(fishesToRender)}
        </div>
      )
}

export default FishContainer;