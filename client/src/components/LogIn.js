import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";


function LogIn({user = null, setUser, onLogIn}){

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    let displayErrors = null;


    useEffect(()=> {
        if (user){
                navigate('/myAquariums');
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]:value})
    }

    function clearCredentials(){
        setCredentials({
            username: "",
            password: ""})
    }
    function handleRegister(e){
        e.preventDefault();
        setErrors([]);
        fetch("/users", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(credentials)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    // onLogIn();
                    setUser(user);
                    navigate("/myAquariums")
                })
            }
            else {
                res.json().then(err => {
                    setErrors(err.errors)
                    clearCredentials();})
            }
        })
    }

    function handleLogIn(e){
        e.preventDefault();
        setErrors([]);
        fetch("/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(credentials)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    // onLogIn();
                    setUser(user);
                    navigate('/myAquariums')
                })
            }
            else {
                res.json().then(err => {
                    setErrors(err.errors);
                    clearCredentials();

                })
            }
        })
    }

    if (errors){
       displayErrors = errors.map((e, index) => <p className="error" key={index}>{e}</p>)
    }

    return(
    <div>
        <Title title={"fishbook"}/>
        <div className="row">
            <div className="card-panel grey lighten-4">
                <form className="col s6 offset-s3">
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" name="username" className="validate" value={credentials.username} onChange={handleFormChange}/>
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password"  value={credentials.password} onChange={handleFormChange} />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="row">
                            <button className="btn waves-effect waves-light" onClick={handleLogIn}>Sign In</button>
                        </div>
                         <div className="row">
                            <button className="btn waves-effect waves-light" onClick={handleRegister}>Register</button>
                        </div>                
                    </div>
                 </div>
                 <div>
                    {errors ? displayErrors : null}
                 </div>
            </div>
        </div>
    </div>
    );
}

export default LogIn;