import '../App.css';
import LogIn from './LogIn.js'
import M from 'materialize-css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AquariumContainer from './AquariumContainer';
import NavBar from './NavBar';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() =>{
    M.AutoInit();
    fetch("/me").then(r => {
      if (r.ok){
        r.json().then(user => setUser(user));
      }
    })
  },[]);

  function handleLogOut(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then(r=> {
      if(r.ok){
        setUser(null);
      }
    });
  }
  
    return (
      <div className="App container">
        <h1>FishBook!</h1>
        <BrowserRouter>
          <Routes>
            <Route index element={<LogIn user={user} setUser={setUser}/>}></Route>
            <Route path='/login' element={<LogIn user={user} setUser={setUser}/>}></Route>
            <Route element={<NavBar user={user} onLogOut={handleLogOut}/>}>
              <Route path='/myAquariums' element={<AquariumContainer user={user}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
