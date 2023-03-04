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
  const [fishList, setFishList] = useState([]);


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
    .then(fishes => setFishList(fishes));
    },[]);

    // useEffect(() => {
    //   M.AutoInit();
    //   fetch('/me')
    //     .then((r) => {
    //       if (r.ok) {
    //         return r.json().then((user) => {
    //           return fetch('/fish').then((r) => r.json()).then((fishes) => {
    //             setFishList(fishes);
    //             setUser(user);
    //           });
    //         });
    //       }
    //       else{
    //         console.log("Please LogIn")
    //       }
    //     })
    //     .catch((error) => {
    //      console.log(error);
    //     });
    // }, []);

    // useEffect(() => {
    //   M.AutoInit();
    //   fetch('/me')
    //     .then(r => {
    //       if (r.ok) {
    //         return r.json().then((user) => {
    //           return fetchFishList().then(fishes => {
    //             setFishList(fishes);
    //             setUser(user);
    //           });
    //         });
    //       } else {
    //         console.log("Please LogIn")
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);
    
    function fetchFishList() {
      return fetch('/fish').then((r) => r.json());
    }

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

  function handleLogIn(){
    fetchFishList().then(fishes => setFishList(fishes))
  }

  function handleCreateFish(newFish){
    setFishList([newFish, ...fishList]);
  }

    return (
      <div className="App container padding-top">
        <BrowserRouter>
          <Routes>
            <Route index element={<LogIn user={user} setUser={setUser} />}></Route>
            <Route path="/login" element={<LogIn user={user} setUser={setUser} onLogIn={handleLogIn}/>}></Route>
            <Route path='/home' element={<LogIn user={null} setUser={setUser} onLogIn={handleLogIn}/>}></Route>
            <Route element={<NavBar user={user} onLogOut={handleLogOut}/>}>
              <Route path='/myAquariums' element={<AquariumContainer user={user} showAll={false} allFish={fishList} />}></Route>
              <Route path='/aquariums' element={<AquariumContainer user={user} showAll={true}/>}></Route>
              <Route path='/fish' element={<AllFish user={user} fishList={fishList} seeAllFish={true} onCreateFish={handleCreateFish}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
