import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
// import { useNavigate } from "react-router-dom";

function FishContainer({fishList, editable = false, canAddFish = false, onAddFish = null, onEditFish=null, onDeleteFish = null}){

    const [fishes, setFishes] = useState([]);

    useEffect(()=>{
        setFishes(fishList)
    },[fishList])

    // console.log("fishes", fishes)
    // console.log("fishes", fishList)
    // console.log("editable", editable)

    const fishesToRender = fishes.map(fish => <FishCard key={fish.id}fish={fish} editable={editable} onDelete={onDeleteFish} canAddFish={canAddFish} onAddFish={onAddFish} onEdit={onEditFish}/>)

    
    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+3){
            res.push(<FishCardRow key={i} card1={arr[i]} card2={arr[i+1]} card3={arr[i+2]}/>)
        }
        return res
    }

    return (
       
        <div>
            {fishes.length != 0 ? <h5>Fish!</h5> :  <h5>No Fish!</h5>}
            {setCards(fishesToRender)}
        </div>
      )
}

export default FishContainer;