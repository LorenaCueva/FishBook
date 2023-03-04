import { cardHeaderColor, headerTextColor } from "../Colors";
import { useState } from "react";

function AquariumForm({showForm, onSubmitForm, editData = null}){

    const isEditForm = editData ? true : false;
    let canEditWaterType = true;

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

       canEditWaterType = editData.fish_qty > 0 ? false : true;

        fillData = {
            image_url: editData.image_url,
            name: editData.name,
            galons: editData.galons,
            filter: editData.filter,
            heater: editData.heater,
            comments: editData.comments,
            water_type: editData.water_type
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
        fetch(`${isEditForm ? `/aquaria/${editData.id}` : "/aquaria"}`,{
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
                                <input id="name" type="text" className="validate" name="name" value={formData.name} onChange={handleFormChange}/>
                                <span  className="required form-helper">* Aquarium name</span>
                        </li>
                        <li className="collection-item">
                                <input id="image" type="text" className="validate" name="image_url" value={formData.image_url} onChange={handleFormChange}/>
                                <span className="form-helper">Image URL</span>
                        </li>
                        <li className="collection-item">
                                <input id="galons" type="text" className="validate" name="galons" value={formData.galons} onChange={handleFormChange}/>
                                <span className="required form-helper">* Galons</span>
                        </li>
                        <li className="collection-item">
                                <input id="filter" type="text" className="validate" name="filter" value={formData.filter} onChange={handleFormChange}/>
                                <span className="form-helper">Filter</span>
                        </li>
                        <li className="collection-item">
                                <input id="heater" type="text" className="validate" name="heater" value={formData.heater} onChange={handleFormChange}/>
                                <span className="form-helper">Heater</span>
                        </li>
                        {canEditWaterType ? <li className="collection-item required form-helper">
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
                        </li> : null}
                        
                        <li className="collection-item">
                                <textarea id="comments" name="comments" className="materialize-textarea" value={formData.comments} onChange={handleFormChange}></textarea>
                                <span className="form-helper">Comments</span>
                        </li>
                        <div className="padding-top">
                            <button className="waves-effect waves-light btn" onClick={showForm}><i className="material-icons left">cancel</i>Cancel</button>
                            <button className="waves-effect waves-light btn" onClick={handleSubmitForm}><i className="material-icons left">check_circle</i>{isEditForm ? "Edit" : "Add"}</button>
                        </div>
                        {errors ? <li className="collection-item">{displayErrors}</li> : null}
                    </ul>
                </form>
    )
}
export default AquariumForm;