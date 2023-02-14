import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
import Title from "./Title";
import Search from "./Search";

function FishContainer({fishList, editable = false, canAddFish = false, onAddFish = null, onEditFish=null, onDeleteFish = null, allFish, onSeeFish= null}){

    const [fishes, setFishes] = useState([]);
    const [search, setSearch] = useState("");
    const [seeOnly, setSeeOnly] = useState(false);
    const [sort, setSort] = useState("");

    useEffect(()=>{
        setFishes(fishList)
    },[fishList])

    function handleSearch(word){
        setSearch(word);
    }

    function handleSeeFish(id){
        seeOnly === id ? setSeeOnly(false) : setSeeOnly(id)
        setSort("")
        onSeeFish(id)
    }

    function handleSort(type){
        setSort(type)
    }


    let sortedFishes = sort ? fishes.filter(fish => fish.fish.water_type === sort) : fishes

    const searchFishes = sortedFishes.filter(fish => fish.fish.name.toLowerCase().includes(search.toLowerCase()))

    sortedFishes = seeOnly ? fishes.filter(fish => fish.fish.id === seeOnly) : searchFishes

    const fishesToRender = sortedFishes.map(fish => <FishCard key={fish.id}fish={fish} editable={editable} onDelete={onDeleteFish} canAddFish={canAddFish} onAddFish={onAddFish} onEdit={onEditFish} allFish={allFish} seeFish={handleSeeFish}/>)

    
    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+3){
            res.push(<FishCardRow key={i} card1={arr[i]} card2={arr[i+1]} card3={arr[i+2]}/>)
        }
        return res
    }
    if(seeOnly){
        return(
            <div>  
                {setCards(fishesToRender)}
               
            </div>
            

        )
    }
    if(!editable && !onAddFish){
        return(
            <div>
                { fishes.length === 0 ? <Title title={"There are No Fish in this Aquarium!"}/> : 
                    <div>
                        <Title title={"Fish"}/>
                        <Search onSearch={handleSearch} onSort={handleSort}/>
                    </div>}
                {setCards(fishesToRender)}
            </div>
        )
    }
    else{
        
        return (
       
            <div>
                {canAddFish ? 
                    <div>
                        <Title title={"Add Fishes"}/>
                        <Search onSearch={handleSearch} onSort={handleSort}/>
                    </div>
                     :
                    fishes.length === 0 ? <Title title={"You Have No Fish in this Aquarium!"}/> :
                    <div>
                        <Title title={"Your Fish"}/>
                        <Search onSearch={handleSearch}/>
                    </div>}
                {setCards(fishesToRender)}
            </div>
          )
    }

    
}

export default FishContainer;