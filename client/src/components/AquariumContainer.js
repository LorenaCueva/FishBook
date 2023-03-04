import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AquariumCard from "./AquariumCard";
import AquariumForm from "./AquariumForm";
import AquariumCardRow from "./AquariumCardRow";
import AquariumInfo from "./AquariumInfo";
import Title from "./Title";

function AquariumContainer({user, showAll = null, allFish = null, fishId = null}){


   const [aquariums, setAquariums] = useState([]);
   const [showForm, setShowForm] = useState(false);
   const [showInfo, setShowInfo] = useState(false);
   const [editable, setEditable] = useState(false);
   
   const navigate = useNavigate();

   let showAquariums = aquariums;


    useEffect(() => {
        if(user == null){
            navigate("/login")
        }
        else if(fishId){
            fetch(`/fish/${fishId}/aquariums`)
            .then(r => r.json())
            .then(aquariums => {
                setAquariums(aquariums)})
        }
        else{
            fetch("/aquariums")
            .then(res => res.json())
            .then(aquariums => setAquariums(aquariums))
            .catch(error => console.log(error))
        }
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    useEffect(() => {
            setAquariums(aquariums)
            setShowInfo(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[navigate])


    function toggleShowForm(){
        setShowForm((showForm)=>!showForm);
    }

    function handleAddAquarium(newAquarium){
        setAquariums([newAquarium, ...aquariums]);
    }

    function handleDeleteAquarium(id){
        const newAquariums = aquariums.filter(aquarium => aquarium.id !== id);
        setShowInfo(false);
        setAquariums(newAquariums);
    }

    function handleEditAquarium(edit){
        const newAquariums = aquariums.map(aquarium => aquarium.id === edit.id ? edit : aquarium)
        setAquariums(newAquariums)
    }

    function handleCardClick(id, cardOwnerId){
        showInfo === false ? setShowInfo(id) : setShowInfo(false)
        setEditable(user.id === cardOwnerId);
    }

    function handleLikeAquarium(aquarium){
        const newAquariums = aquariums.map(aq => aq.id === aquarium.id ? aquarium : aq )
        setAquariums(newAquariums)
    }
   
    if(showInfo){
        showAquariums = aquariums.filter(aquarium => aquarium.id === showInfo);
    }
    else if(fishId){
        showAquariums = aquariums;
    } 
    else if(showAll){
        showAquariums = aquariums.filter(aquarium => aquarium.user_id !== user.id);
    }
    else{
        showAquariums = aquariums.filter(aquarium => aquarium.user_id === user.id);
    }

    let aquariumsToRender = showAquariums.map(aquarium => <AquariumCard key={aquarium.id} aquarium={aquarium} onDelete={handleDeleteAquarium} onEdit={handleEditAquarium} onCardClick={handleCardClick} userId={user.id} onLike={handleLikeAquarium}></AquariumCard>);

    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+2){
            res.push(<AquariumCardRow key={i} card1={arr[i]} card2={arr[i+1]}/>);
        }
        return res;
    }

    function handleAddFishToCard(newAquarium){
        // const aq = aquariums.filter(aquarium => aquarium.id === aquariumId)
        // aq[0].fish_qty = Number(aq[0].fish_qty) + Number(qty)
        const newAquariums = aquariums.map(aquarium => aquarium.id === newAquarium.id ? newAquarium : aquarium)
        setAquariums(newAquariums)
    }
  

    if (user){
        return(
            <div>
                <Title title={showAll ? "Community Aquariums" : "My Aquariums"}/>
                {showInfo || showAll ? null : <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">add_box</i>Add Aquarium</button></div>}
                {showForm ? 
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <AquariumForm showForm={toggleShowForm} onSubmitForm={handleAddAquarium}/>
                        </div>
                    </div>: null}
                {showInfo ? <div className="row"><div className="col s6 offset-s3">{aquariumsToRender}</div></div> : setCards(aquariumsToRender)}
                {showInfo ? <AquariumInfo aquariumId={showInfo} editable={editable} allFish={allFish} onAddFish={handleAddFishToCard}/> : null}

            </div>
            
        )
    }
    else{
        return(
            <></>
        )
    }
}
export default AquariumContainer;