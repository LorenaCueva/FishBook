import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
import Title from "./Title";

function FishContainer({fishList, editable = false, canAddFish = false, onAddFish = null, onEditFish=null, onDeleteFish = null}){

    const [fishes, setFishes] = useState([]);

    useEffect(()=>{
        setFishes(fishList)
    },[fishList])

    const fishesToRender = fishes.map(fish => <FishCard key={fish.id}fish={fish} editable={editable} onDelete={onDeleteFish} canAddFish={canAddFish} onAddFish={onAddFish} onEdit={onEditFish}/>)

    
    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+3){
            res.push(<FishCardRow key={i} card1={arr[i]} card2={arr[i+1]} card3={arr[i+2]}/>)
        }
        return res
    }
    
    if(!editable && !onAddFish){
        return(
            <div>
                { fishes.length == 0 ? <Title title={"There are No Fish in this Aquarium!"}/> : <Title title={"Fish"}/>}
                {setCards(fishesToRender)}
            </div>
        )
    }
    else{
        return (
       
            <div>
                {canAddFish ? <Title title={"Add Fishes"}/> :
                    fishes.length == 0 ? <Title title={"You Have No Fish in this Aquarium!"}/> : <Title title={"Your Fish"}/>}
                {setCards(fishesToRender)}
            </div>
          )
    }

    
}

export default FishContainer;