import '../App.css';
import LogIn from './LogIn.js'
import M from 'materialize-css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AquariumContainer from './AquariumContainer';
import NavBar from './NavBar';
import AllFish from './AllFish';


function App() {

  const [user, setUser] = useState(null);
  const [allFish, setAllFish] = useState([]);

  useEffect(() =>{
    M.AutoInit();
    fetch("/me").then(r => {
      if (r.ok){
        r.json().then(user => {
          setUser(user);
          });
      }
    })
    fetch('/fish')
    .then(r => r.json())
    .then(fishes => setAllFish(fishes));
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
      <div className="App container padding-top">
        <BrowserRouter>
          <Routes>
            <Route index element={<LogIn user={user} setUser={setUser} />}></Route>
            <Route path="/login" element={<LogIn user={user} setUser={setUser}/>}></Route>
            <Route path='/home' element={<LogIn user={null} setUser={setUser} />}></Route>
            <Route element={<NavBar user={user} onLogOut={handleLogOut}/>}>
              <Route path='/myAquariums' element={<AquariumContainer user={user} showAll={false} allFish={allFish} />}></Route>
              <Route path='/aquariums' element={<AquariumContainer user={user} showAll={true}/>}></Route>
              <Route path='/fish' element={<AllFish user={user} seeAllFish={true}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
