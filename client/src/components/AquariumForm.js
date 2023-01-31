import { cardHeaderColor, headerTextColor } from "../Colors";
import { useState } from "react";

function AquariumForm({showForm, onAddAquarium, edit = null}){

    const clearFormData = { 
        image_url: "",
        name: "",
        galons: "",
        filter: "",
        heater: "",
        water_type: "",
        comments: ""
    }

    let fillData = {};

    if(!edit){
        fillData = clearFormData
    }
    else{
        fillData = {
            image_url: edit.image_url,
            name: edit.name,
            galons: edit.galons,
            filter: edit.filter,
            heater: edit.filter,
            comments: edit.comments
        }
    }

    const [formData, setFormData] = useState(fillData);
    const [errors, setErrors] = useState([]);

    let displayErrors = null

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value})
    }

    function handleAddAquarium(e){
        e.preventDefault();
        fetch(`${edit ? `/aquariums/${edit.id}` : "/aquariums/"}`,{
            method: `${edit ? "PATCH" : "POST"}`,
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(r => {
            if(r.ok){
                r.json().then(obj => {
                    showForm()
                    onAddAquarium(obj)
                })
            }
            else {
                r.json().then(err => {
                    setErrors(err.errors);
                    if (!edit){
                        setFormData(clearFormData);
                    }
                })
            }
        })
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>)
     }
    
    return (
                <form>
                    <ul className={`collection with-header`}>
                        <li className={`collection-header ${cardHeaderColor}`}><h5 className={`${headerTextColor}-text`}>{edit ? "Edit" : "New"} Aquarium</h5></li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="name" type="text" className="validate" name="name" value={formData.name} onChange={handleFormChange}/>
                                <span className="helper-text">* Aquarium name</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="image" type="text" className="validate" name="image" value={formData.image_url} onChange={handleFormChange}/>
                                <span className="helper-text">Image URL</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="galons" type="text" className="validate" name="galons" value={formData.galons} onChange={handleFormChange}/>
                                <span className="helper-text">* Galons</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="filter" type="text" className="validate" name="filter" value={formData.filter} onChange={handleFormChange}/>
                                <span className="helper-text">Filter</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="heater" type="text" className="validate" name="heater" value={formData.heater} onChange={handleFormChange}/>
                                <span className="helper-text">Heater</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <label> *
                                <input name="water_type" type="radio" value="Freshwater" onChange={handleFormChange}/>
                                <span>Freshwater</span>
                            </label>
                            <label>
                                <input name="water_type" type="radio" value="Saltwater" onChange={handleFormChange}/>
                                <span>Saltwater</span>
                            </label>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <textarea id="comments" name="comments" className="materialize-textarea" value={formData.comments} onChange={handleFormChange}></textarea>
                                <span className="helper-text">Comments</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <button className="waves-effect waves-light btn" onClick={showForm}><i className="material-icons left">cancel</i>Cancel</button>
                            <button className="waves-effect waves-light btn" onClick={handleAddAquarium}><i className="material-icons left">add_box</i>{edit ? "Edit" : "Add"}</button>
                        </li>
                        {errors ? <li className="collection-item">{displayErrors}</li> : null}
                    </ul>
                </form>
    )
}
export default AquariumForm;