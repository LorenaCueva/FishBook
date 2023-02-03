import { freshWaterColor, saltwaterColor, headerTextColor, hoverColor} from "../Colors";
import { useState } from "react";
import AquariumForm from "./AquariumForm";
import { useNavigate } from "react-router-dom";

function AquariumCard({aquarium, editable, onDelete, onEdit, onCardClick}){

    const {id, name, galons, filter, heater, comments, by, water_type, image_url} = aquarium;

    const [isOnEdit, setIsOnEdit] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();


    const color = aquarium.water_type === "Freshwater" ? freshWaterColor : saltwaterColor;

    let hoveringColor = isHovering? hoverColor : color;


    ///change this
    let image = image_url == "" || null ? "../fish_bowl.png" : image_url;


        function handleDelete(){
            fetch(`/aquariums/${id}`,{
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    onDelete(id)
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

        // function handleAddFish(){
        //     console.log("fish")
        // }

        function handleCardClick(){
            onCardClick(id)
        }

        const handleMouseEnter = () => {
            setIsHovering(true);
          };
        
          const handleMouseLeave = () => {
            setIsHovering(false);
          };
        
    if(!isOnEdit){
        return(
            <div>
            <ul className={`collection with-header left-align`} onClick={handleCardClick} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <li className={`collection-header ${hoveringColor}`}>
                    <div className="secondary-content">
                            {editable ?
                                <div className="white-text">
                                    <i className="padding-center small material-icons white-text" onClick={toggleEdit}>edit</i>
                                    <i className="padding-center small material-icons white-text" onClick={handleDelete}>delete</i>
                                    {/* <i className="padding-center small material-icons white-text" onClick={handleAddFish}>add_circle</i> */}
                                </div>
                            : null}
                        </div>
                    <h5 className={`${headerTextColor}-text`}>{name}</h5>
                </li>
                {/* <li className="collection-item right-align">
                    <span>By: {aquarium.by}</span>
                </li> */}
                <li className="center-align collection-item">
                    <img src={image}/>
                </li>
                {/* <li className="collection-item">
                    <span>Type: {aquarium.water_type}</span>
                </li> */}
                <li className="collection-item">
                    <span>Galons: {galons}</span>
                </li>
                <li className="collection-item">
                    <span>Filter: {filter}</span>
                </li>
                <li className="collection-item">
                    <span>Heater: {heater}</span>
                </li>
                <li className="collection-item">
                    <span>Comments: {comments}</span>
                </li>
                    {/* <span>By: {aquarium.by}</span> */}
             
            </ul>
            {/* <div className="padding-top">
                <button className="waves-effect waves-light btn" onClick={()=>console.log("fish")}>Add Fish</button>
            </div> */}
            <span className="new badge" data-badge-caption={by}>By:</span>
            <span className={`new badge ${color}`} data-badge-caption={water_type}></span>
            </div>
        )
    }
    else{
        return(
            <AquariumForm showForm={toggleEdit} onSubmitForm={handleEditAquarium} editData={aquarium}/>
        )
    }
       
   
}
export default AquariumCard;