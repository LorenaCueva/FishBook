import { useState } from "react";
import { cardHeaderColor } from "../Colors";

function FishForm({showForm, onCreateFish}){

    let displayErrors = null

    const clearFormData = { 
        name: "",
        temperament: "",
        image_url: "",
        lifespan: "",
        size: "",
        diet: "",
        water_type:""
    }

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState(clearFormData);

    function handleFormChange(e){
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
    }

    function handleFormSubmit(e){
        e.preventDefault();
        fetch('/fish', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(r => {
            if (r.ok){
                r.json().then(fish => {
                    showForm();
                    onCreateFish(fish);
                })
            }
            else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>);
     }

    return(
    <form>
    <ul className={`collection with-header center-align`}>
        <li className={`collection-header ${cardHeaderColor}`}>
            <input id="name" type="text" className="white-text" name="name" value={formData.name} onChange={handleFormChange}/>
            <span  className="required form-helper">* Fish name</span>
        </li>
        <li className="collection-item">
            <input id="temperament" type="text" name="temperament" value={formData.temperament} onChange={handleFormChange}/>
            <span  className="required form-helper">* Temperament</span>
        </li>
        <li className="collection-item">
            <input id="image" type="text" name="image_url" value={formData.image_url} onChange={handleFormChange}/>
            <span  className="form-helper">Image URL</span>
        </li>
        <li className="collection-item">
            <div className="input-field inline">
                <input id="lifespan" type="text" name="lifespan"  value={formData.lifespan} onChange={handleFormChange}/>
                <span className="required form-helper">* Lifespan</span>
            </div>
            years
        </li>
        <li className="collection-item">
            Up to:
            <div className="input-field inline">
                <input id="size" type="text" name="size"  value={formData.size} onChange={handleFormChange}/>
                <span className="required form-helper">* Size</span>
            </div>
            inches
        </li>
        <li className="collection-item">
            <input id="diet" type="text" name="diet" value={formData.diet} onChange={handleFormChange}/>
            <span  className="required form-helper">* Diet</span>
        </li>
        <li className="collection-item ">
            <label> 
                <input name="water_type" type="radio" value="Freshwater" onChange={handleFormChange} checked={formData.water_type === "Freshwater"}/>
                <span className="form-helper">Freshwater</span>
            </label>
            <label>
            <input name="water_type" type="radio" value="Saltwater" onChange={handleFormChange} checked={formData.water_type === "Saltwater"}/>
                <span>Saltwater</span>
            </label>
            <div>
                <span className="required form-helper">* Water Type</span>
            </div>
        </li>
        <li className="collection-item">
            <label> 
                <input name="care_level" type="radio" value="Easy" onChange={handleFormChange} checked={formData.care_level === "Easy"}/>
                <span className="form-helper">Easy</span>
            </label>
            <label>
            <input name="care_level" type="radio" value="Medium" onChange={handleFormChange} checked={formData.care_level === "Medium"}/>
                <span>Medium</span>
            </label>
            <label>
            <input name="care_level" type="radio" value="Hard" onChange={handleFormChange} checked={formData.care_level === "Hard"}/>
                <span>Hard</span>
            </label>
            <div>
                <span className="required form-helper">* Care Level</span>
            </div>
        </li> 
        <div className="padding-top">
            <button className="waves-effect waves-light btn" onClick={showForm}><i className="material-icons left">cancel</i>Cancel</button>
            <button className="waves-effect waves-light btn" onClick={handleFormSubmit}><i className="material-icons left">check_circle</i>Add</button>
        </div>
        {errors ? <li className="collection-item">{displayErrors}</li> : null}
    </ul>
    </form>
    )
}
export default FishForm;