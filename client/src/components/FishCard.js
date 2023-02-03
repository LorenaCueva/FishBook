import {headerTextColor} from "../Colors";
import { setLevelColor, saltwaterColor, freshWaterColor } from "../Colors";

function FishCard({fish}){

    const {name, care_level, temperament, image_url, lifespan, size, diet, water_type} = fish
    const waterColor = water_type === "Freshwater" ? freshWaterColor : saltwaterColor;

    return (
    <div>
    <ul className={`collection with-header left-align`}>
        <li className={`collection-header ${waterColor}`}>
            <div className="secondary-content">
                <div className="white-text">
                    <i className="padding-center small material-icons white-text" onClick={()=>{}}>add_circle</i>
                </div>
            </div>
            <h5 className={`${headerTextColor}-text`}>{name}</h5>
        </li>
        <li className="center-align collection-item">
            <img src={"../fish.png"}/>
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
    </div>
    )
}
export default FishCard;