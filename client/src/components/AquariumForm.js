import { cardHeaderColor, headerTextColor } from "../Colors";
import { useState } from "react";

function AquariumForm({showForm, onSubmitForm, editData = null}){

    const isEditForm = editData ? true : false

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

    if(editData){
        fillData = {
            image_url: editData.image_url,
            name: editData.name,
            galons: editData.galons,
            filter: editData.filter,
            heater: editData.filter,
            comments: editData.comments
        }
    }
    else{
        fillData = clearFormData;
    }

    const [formData, setFormData] = useState(fillData);
    const [errors, setErrors] = useState([]);

    let displayErrors = null

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value});
    }

    function handleSubmitForm(e){
        e.preventDefault();
        fetch(`${isEditForm ? `/aquariums/${editData.id}` : "/aquariums"}`,{
            method: `${isEditForm ? "PATCH" : "POST"}`,
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(r => {
            if(r.ok){
                r.json().then(obj => {
                    showForm()
                    onSubmitForm(obj)
                })
            }
            else {
                r.json().then(err => {
                    setErrors(err.errors);
                    if (!isEditForm){
                        setFormData(clearFormData);
                    }
                })
            }
        })
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>);
     }
    
    return (
                <form onSubmit={handleSubmitForm}>
                    <ul className={`collection with-header`}>
                        <li className={`collection-header ${cardHeaderColor}`}><h5 className={`${headerTextColor}-text`}>{isEditForm ? "Edit" : "New"} Aquarium</h5></li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="name" type="text" className="validate" name="name" value={formData.name} onChange={handleFormChange}/>
                                <span className="helper-text">* Aquarium name</span>
                            </div>
                        </li>
                        <li className="collection-item">
                            <div className="input-field">
                                <input id="image" type="text" className="validate" name="image_url" value={formData.image_url} onChange={handleFormChange}/>
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
                            <button className="waves-effect waves-light btn" onClick={handleSubmitForm}><i className="material-icons left">add_box</i>{isEditForm ? "Edit" : "Add"}</button>
                        </li>
                        {errors ? <li className="collection-item">{displayErrors}</li> : null}
                    </ul>
                </form>
    )
}
export default AquariumForm;