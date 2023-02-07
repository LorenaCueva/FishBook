import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AquariumCard from "./AquariumCard";
import AquariumForm from "./AquariumForm";
import AquariumCardRow from "./AquariumCardRow";
import AquariumInfo from "./AquariumInfo";
// import FishContainer from "./FishContainer";

function AquariumContainer({user, showAll, allFish}){


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
        else{
            fetch("/aquariums")
            .then(res => res.json())
            .then(aquariums => {
                setAquariums(aquariums)})
            .catch(error => console.log(error))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    useEffect(() => {
            setAquariums(aquariums)
            setShowInfo(false);
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
        const newAquariums = aquariums.map(aquarium => aquarium.id == edit.id ? edit : aquarium);
        setAquariums(newAquariums);
    }

    function handleCardClick(id, cardOwnerId){
        showInfo == false ? setShowInfo(id) : setShowInfo(false);
        setEditable(user.id === cardOwnerId);
    }
   

    if(showInfo){
        showAquariums = aquariums.filter(aquarium => aquarium.id === showInfo);
    }
    else if(showAll){
        showAquariums = aquariums.filter(aquarium => aquarium.user_id !== user.id);
    } 
    else{
        showAquariums = aquariums.filter(aquarium => aquarium.user_id === user.id);
    }

    let aquariumsToRender = showAquariums.map(aquarium => <AquariumCard key={aquarium.id} aquarium={aquarium} onDelete={handleDeleteAquarium} onEdit={handleEditAquarium} onCardClick={handleCardClick} editable={aquarium.user_id === user.id}></AquariumCard>);

    function setCards(arr){
        let res = [];
        for(let i = 0; i < arr.length; i = i+2){
            res.push(<AquariumCardRow key={i} card1={arr[i]} card2={arr[i+1]}/>);
        }
        return res;
    }

    if (user){
        return(
            <div>
                <h4>Title</h4>
                {showInfo || showAll ? null : <div className="padding-top"><button className="btn waves-effect waves-light" onClick={toggleShowForm}><i className="material-icons left">add_box</i>Add Aquarium</button></div>}
                {showForm ? 
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <AquariumForm showForm={toggleShowForm} onSubmitForm={handleAddAquarium}/>
                        </div>
                    </div>: null}
                {showInfo ? <div className="row"><div className="col s6 offset-s3">{aquariumsToRender}</div></div> : setCards(aquariumsToRender)}
                {/* {showInfo ? <FishContainer aquariumId={showInfo} editable={editable}/> : null} */}
                {showInfo ? <AquariumInfo aquariumId={showInfo} editable={editable} allFish={allFish}/> : null}

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