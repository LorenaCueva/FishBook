import {headerTextColor} from "../Colors";
import { setLevelColor, saltwaterColor, freshWaterColor } from "../Colors";
import { useEffect, useState } from "react";

function FishCard({fish, editable, onDelete = null, onEdit = null, canAddFish = false, onAddFish = null, seeAllFish = null, seeFish}){

    const fishQty = fish.qty ? fish.qty : "";

    let displayErrors = [];

    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState("")
    const {name, care_level, temperament, lifespan, size, diet, water_type, id, image_url} = fish.fish;
    const [errors, setErrors] = useState([]);
    const waterColor = water_type === "Freshwater" ? freshWaterColor : saltwaterColor;
    let image = image_url === null || image_url === "" ? "../fish.png" : image_url;


    useEffect(()=>{
        setFormData({qty: fishQty})
    },[fishQty])

    function handleDeleteFish(){
        fetch(`/housings/${fish.id}`,{
            method: "DELETE"})
            .then(r => {
                if(r.ok){
                    r.json().then(housing => {
                        onDelete(housing)})
                }
                else{
                    r.json().then(error => console.log(error))
                }
            })
    }

    function toggleEdit(){
        setEdit((edit)=>!edit)
        setErrors([]);
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
                .then(housing => {
                    onEdit(housing)
                })
            }
            else{
                r.json().then(error => 
                    {setErrors(error.errors);
                        setFormData({qty: fishQty});
                    })
            }
        })
        toggleEdit();

    }

    function handleAddFish(){
        const qty = window.prompt("Qty: ");
        if(qty && !isNaN(qty)){
            onAddFish(id, qty)
        }
        else{
            setErrors(["Qty not correct. Fish not added"])
        }
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>);
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
                {seeAllFish ? <i className="padding-center small material-icons white-text" onClick={()=>seeFish(id)}>remove_red_eye</i> : null}
            </div>
            <h5 className={`${headerTextColor}-text`}>{name}</h5>
        </li>
        <li className="center-align collection-item">
            <img src={image} alt={"fish img"}/>
        </li>
        <li className={`${waterColor}collection-item center-align`}>
        {edit ? 
            <form onSubmit={handleFormSubmit}>
                <input id="qty" type="text" className={`${headerTextColor}-text center-align`} name="qty" value={formData.qty} onChange={handleFormChange}/>
                <span  className={`${headerTextColor}-text form-helper`}>Qty </span>
                </form>
            : 
            formData.qty === "" ? null : <span  className={`${headerTextColor}-text form-helper`}>Qty: {formData.qty} </span> }

        </li>
        <li className="collection-item">
            <span>Size: Up to {size} inches</span>
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
        {seeAllFish ? <li className="collection-item">
            <span>Found in: {fish.total_aquariums} community aquariums</span>
        </li>: null}
        {errors ? <li className="collection-item center-align">{displayErrors}</li> : null}
    </ul>
        <span className={`new badge ${setLevelColor(waterColor)}`} data-badge-caption={water_type}></span>
        <span className={`new badge ${setLevelColor(care_level)}`} data-badge-caption={care_level}></span>
    </div>
    )
 }
export default FishCard;