import {headerTextColor} from "../Colors";
import { setLevelColor, saltwaterColor, freshWaterColor } from "../Colors";
import { useState } from "react";

function FishCard({fish, editable, onDelete, canAddFish}){

    // console.log("inFish", canAddFish)

    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState(editable ? {name: fish.name} : null)
    const {name, care_level, temperament, image_url, lifespan, size, diet, water_type, id} = editable ? fish.fish : fish;
    const waterColor = water_type === "Freshwater" ? freshWaterColor : saltwaterColor;

    function handleDeleteFish(){
        fetch(`/housings/${fish.id}`,{
            method: "DELETE"})
            .then(r => {
                if(r.ok){
                   onDelete(fish.id)
                }
                else{
                    r.json().then(error => console.log(error))
                }
            })
        
    }

    function toggleEdit(){
        setEdit((edit)=>!edit)
    }

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value});
    }

    function handleFormSubmit(e){
        e.preventDefault();
        fetch(`/housings/${fish.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(formData)
        })
        .then(r => {
            if(r.ok){
                r.json()
                .then(edit => setFormData({name: edit.name}))
            }
            else{
                r.json().then(error => console.log(error))
            }
        })
        toggleEdit();

    }

    function handleAddFish(){
        console.log(id)
    }

    return (
    <div>
    <ul className={`collection with-header left-align`}>
        <li className={`collection-header ${waterColor}`}>
            <div className="secondary-content">
                {editable ? <div className="white-text"> 
                                <i className="padding-center small material-icons white-text" onClick={toggleEdit}>edit</i>
                                <i className="padding-center small material-icons white-text" onClick={handleDeleteFish}>delete</i>
                            </div> : null}
                {canAddFish ? <i className="padding-center small material-icons white-text" onClick={handleAddFish}>add_circle</i> : null}
            </div>
            <h5 className={`${headerTextColor}-text`}>{name}</h5>
        </li>
        <li className="center-align collection-item">
            <img src={"../fish.png"}/>
        </li>
        <li className={`${waterColor}collection-item center-align`}>
            {editable ? 
                edit  ? 
                    <form onSubmit={handleFormSubmit}>
                        <input id="name" type="text" className={`${headerTextColor}-text center-align`} name="name" value={formData.name} onChange={handleFormChange}/>
                        <span  className={`${headerTextColor}-text form-helper`}>Fish name</span>
                    </form>: 
            <span className={`${headerTextColor}-text`}>{formData.name}</span> : null}

        </li>
        <li className="collection-item">
            <span>Size: {size} inches</span>
        </li>
        <li className="collection-item">
            <span>Care Level: {care_level}</span>
        </li>
        <li className="collection-item">
            <span>Temperament: {temperament}</span>
        </li>
        <li className="collection-item">
            <span>Lifespan: {lifespan} years </span>
        </li>
        <li className="collection-item">
            <span>Diet: {diet}</span>
        </li>
    </ul>
        <span className={`new badge ${setLevelColor(waterColor)}`} data-badge-caption={water_type}></span>
        <span className={`new badge ${setLevelColor(care_level)}`} data-badge-caption={care_level}></span>
        {/* {canAddFish ? <button className="waves-effect waves-light btn" onClick={()=>console.log("fish")}>Add Fish</button> : null} */}
    </div>
    )
}
export default FishCard;