import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
import { useNavigate } from "react-router-dom";

function FishContainer({aquariumId = null}){

    const [fishes, setFishes] = useState([]);

    useEffect(()=>{
        if(aquariumId){
            fetch(`/aquariums/${aquariumId}`)
            .then(r => r.json())
            .then(aquarium => setFishes(aquarium.fish))
            console.log(fishes)
        }
        else{
        fetch("/fish")
        .then(r => r.json())
        .then(fishes => setFishes(fishes))
        .catch(error => console.log(error))
        }
    },[aquariumId])

    const fishesToRender = fishes.map(fish => <FishCard key={fish.id}fish={fish}/>)

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


    return (
        <div>
            <h5>Fish!</h5>
            {setCards(fishesToRender)}
        </div>
    )
}
export default FishContainer;