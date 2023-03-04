import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import AquariumCard from "./AquariumCard";
import AquariumForm from "./AquariumForm";
import AquariumCardRow from "./AquariumCardRow";
import AquariumInfo from "./AquariumInfo";
import Title from "./Title";

function AquariumContainer({showAll = null, fishId = null}){

   const {user} = useContext(UserContext);
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
        else {
            if(fishId){
                fetch(`/fish/${fishId}/aquaria`)
                .then(r => r.json())
                .then(aquariums => setAquariums(aquariums))
            }
            else{
                fetch("/aquaria")
                .then(res => res.json())
                .then(aquariums => setAquariums(aquariums))
                .catch(error => console.log(error))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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

    let aquariumsToRender = showAquariums.map(aquarium => <AquariumCard key={aquarium.id} aquarium={aquarium} onDelete={handleDeleteAquarium} onEdit={handleEditAquarium} onCardClick={handleCardClick} onLike={handleLikeAquarium}></AquariumCard>);

    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+2){
            res.push(<AquariumCardRow key={i} card1={arr[i]} card2={arr[i+1]}/>);
        }
        return res;
    }

    function handleAddFishToCard(newAquarium){
        const newAquariums = aquariums.map(aquarium => aquarium.id === newAquarium.id ? newAquarium : aquarium)
        setAquariums(newAquariums)
    }
    
    if(user){
    if(showForm){
        return(
            <div>
                <Title title="My Aquariums"/>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">{!showForm ? "add" : "remove"}</i>Add Aquarium</button></div>
                        <AquariumForm showForm={toggleShowForm} onSubmitForm={handleAddAquarium}/>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <Title title={showAll ? "Community Aquariums" : "My Aquariums"}/>
                {showInfo || showAll ? null : <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">{!showForm ? "add" : "remove"}</i>Add Aquarium</button></div>}
                {showInfo ? <div className="row"><div className="col s6 offset-s3">{aquariumsToRender}</div></div> : setCards(aquariumsToRender)}
                {showInfo ? <AquariumInfo aquariumId={showInfo} editable={editable} onAddFish={handleAddFishToCard}/> : null}

            </div>
        )
    }
}
else{
    return(<></>)
}

   
}
export default AquariumContainer;