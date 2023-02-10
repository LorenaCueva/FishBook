import { freshWaterColor, saltwaterColor, headerTextColor, hoverColor} from "../Colors";
import { useEffect, useState } from "react";
import AquariumForm from "./AquariumForm";

function AquariumCard({aquarium, onDelete, onEdit, onCardClick, addQty, userId}){


    const {id, name, galons, filter, heater, comments, by, water_type, image_url, user_id, fish_qty} = aquarium;

    const [isOnEdit, setIsOnEdit] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [qty, setQty] = useState(Number(fish_qty));
    const [liked, setLiked] = useState(aquarium.likes.includes(userId));
    const [likes, setLikes] = useState(aquarium.likes.length)

    const editable = userId === aquarium.user_id;

    useEffect(()=>{
        setQty(qty => qty+Number(addQty))
    },[addQty])
    // const [seeInfo, setSeeInfo] = useState(false);

    const color = aquarium.water_type === "Freshwater" ? freshWaterColor : saltwaterColor;

    let hoveringColor = isHovering? hoverColor : color;

    // console.log(Number(fish_qty) + Number(addQty))


    ///change this
    let image = image_url === "" || null ? "../fish_bowl.png" : image_url;


        function handleDelete(){
            fetch(`/aquariums/${id}`,{
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    onDelete(id);
                    // setQty(qty - fish_qty);
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

        function handleCardClick(){
            onCardClick(id, user_id);
        }

        function handleLikeClick(){
            // liked ? setLiked(false) : setLiked(true)

            if(liked) {
                fetch(`/likes/aquariums/${id}`, {
                    method: "DELETE"
                })
                .then(r => {
                    if(r.ok){
                        setLiked(false);
                        setLikes(likes => likes - 1);
                    }
                    else{
                        r.json().then(error => console.log(error))
                }
                })
            }
    
            else{
                fetch(`/likes/aquariums/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        aquarium_id: id
                    })
                })
                    .then(r => {
                        if(r.ok){
                            setLiked(true);
                            setLikes(likes => likes + 1);
                        }
                        else{
                            r.json().then(error => console.log(error))
                    }
                    })
                }
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
            <ul className={`collection with-header left-align`} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <li className={`collection-header ${hoveringColor}`}>
                    <div className="secondary-content">
                                <div className="white-text">
                                {editable ?
                                    <>
                                        <i className="padding-center small material-icons white-text" onClick={toggleEdit}>edit</i>
                                        <i className="padding-center small material-icons white-text" onClick={handleDelete}>delete</i>
                                    </> : null}
                                    <i className="padding-center small material-icons white-text" onClick={handleCardClick}>bubble_chart</i>
                                </div>
                        </div>
                    <h5 className={`${headerTextColor}-text`}>{name}</h5>
                </li>
                <li className="center-align collection-item">
                    <img src={image} alt={"aquarium img"}/>
                </li>
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
                <li className="collection-item">
                    <span>Total fish: {qty}</span>
                </li>
             
            </ul>
            <span className="new badge" data-badge-caption={by}>By:</span>
            <span className={`new badge ${color}`} data-badge-caption={water_type}></span>
            {/* <span className="badge" data-badge-caption="❤️">{aquarium.likes.length}</span> */}
            <span className="badge"><i className="padding small material-icons red-text" onClick={handleLikeClick}>{liked ? "favorite" : "favorite_border"}</i>{likes}</span>
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