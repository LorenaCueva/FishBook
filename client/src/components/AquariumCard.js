import { freshWaterColor, saltwaterColor, headerTextColor } from "../Colors";
import { useState } from "react";
import AquariumForm from "./AquariumForm";

function AquariumCard({aquarium, editable, onDelete, onEdit }){

    const [isOnEdit, setIsOnEdit] = useState(false);

    const color = aquarium.water_type === "Freshwater" ? freshWaterColor : saltwaterColor;

    ///change this
    let image = aquarium.image_url == "" ? "https://yt3.ggpht.com/a/AGF-l79cTJfjYOT2b3PnM6HWCh9rZFE_yekVHnlb4Q=s900-c-k-c0xffffffff-no-rj-mo" : aquarium.image_url;


        function handleDelete(){
            fetch(`/aquariums/${aquarium.id}`,{
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    onDelete(aquarium.id)
                }
                else{
                    r.json().then(error => console.log(error))
                }
            })
        }

        function toggleEdit(){
            setIsOnEdit((isOnEdit) => !isOnEdit)
        }

        function handleEditAquarium(edit){
            onEdit(edit)
        }

        // console.log(onEdit)

    if(!isOnEdit){
        return(
            <ul className={`collection with-header left-align`}>
                <li className={`collection-header ${color}`}>
                    <div className="secondary-content">
                            {editable ?
                                <div className="white-text">
                                    <i className="padding-center small material-icons white-text" onClick={toggleEdit}>edit</i>
                                    <i className="padding-center small material-icons white-text" onClick={handleDelete}>delete</i>
                                </div>
                            : null}
                        </div>
                    <h5 className={`${headerTextColor}-text`}>{aquarium.name}</h5></li>
                <li className="collection-item right-align">
                    <span>By: {aquarium.by}</span>
                </li>
                <li className="center-align collection-item">
                    <img src={image}/>
                </li>
                <li className="collection-item">
                    <span>Type: {aquarium.water_type}</span>
                </li>
                <li className="collection-item">
                    <span>Galons: {aquarium.galons}</span>
                </li>
                <li className="collection-item">
                    <span>Filter: {aquarium.filter}</span>
                </li>
                <li className="collection-item">
                    <span>Heater: {aquarium.heater}</span>
                </li>
                <li className="collection-item">
                    <span>Comments: {aquarium.comments}</span>
                </li>
            </ul>
        )
    }
    else{
        return(
            <AquariumForm showForm={toggleEdit} onSubmitForm={handleEditAquarium} editData={aquarium}/>
        )
    }
       
   
}
export default AquariumCard;