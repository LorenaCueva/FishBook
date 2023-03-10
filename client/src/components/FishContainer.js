import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import FishCardRow from "./FishCardRow";
import Title from "./Title";
import Search from "./Search";

function FishContainer({fishList, editable = false, canAddFish = false, onAddFish = null, onEditFish=null, onDeleteFish = null, seeAllFish, onSeeFish= null}){

    const [fishes, setFishes] = useState([]);
    const [search, setSearch] = useState("");
    const [seeOnly, setSeeOnly] = useState(false);
    const [sort, setSort] = useState("All");
    
    useEffect(()=>{
        if(fishList){
            setFishes(fishList)
        }
        else{
            fetch('/fish')
            .then(r => r.json())
            .then(fishes => setFishes(fishes))
        }
        if (canAddFish){
            setSort(canAddFish);
        }
    },[fishList, canAddFish])

    function handleSearch(word){
        setSearch(word);
    }

    function handleSeeFish(id){
        seeOnly === id ? setSeeOnly(false) : setSeeOnly(id)
        setSort("All")
        onSeeFish(id)
    }

    function handleSort(type){
        setSort(type)
    }

    let sortedFishes = sort === "All" ? fishes : fishes.filter(fish => fish.fish.water_type === sort)

    const searchFishes = sortedFishes.filter(fish => fish.fish.name.toLowerCase().includes(search.toLowerCase()))

    sortedFishes = seeOnly ? fishes.filter(fish => fish.fish.id === seeOnly) : searchFishes

    const fishesToRender = sortedFishes.map(fish => <FishCard key={fish.id}fish={fish} editable={editable} onDelete={onDeleteFish} canAddFish={canAddFish} onAddFish={onAddFish} onEdit={onEditFish} seeAllFish={seeAllFish} seeFish={handleSeeFish}/>)

    
    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+3){
            res.push(<FishCardRow key={i} card1={arr[i]} card2={arr[i+1]} card3={arr[i+2]}/>)
        }
        return res
    }

    if(seeOnly){
        return(
            <div className="row">  
                <div className="col s12 offset-s4">
                    {setCards(fishesToRender)}
                </div>
            </div>
        )
    }

    if(!editable && !onAddFish){
        return(
            <div>
                { fishes.length === 0 ? <Title title={"There are No Fish in this Aquarium!"}/> : 
                    <div>
                        {seeAllFish ? <Search onSearch={handleSearch} onSort={handleSort}/> : <Search onSearch={handleSearch}/>}
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
                        <Search onSearch={handleSearch}/>
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