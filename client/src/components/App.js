import '../App.css';
import LogIn from './LogIn.js'
import M from 'materialize-css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import AquariumContainer from './AquariumContainer';
import NavBar from './NavBar';
import AllFish from './AllFish';
import { UserProvider } from './UserContext';


function App() {

  const [user, setUser] = useState(null);
  const [fishList, setFishList] = useState([]);


  // useEffect(() =>{
  //   M.AutoInit();
  //   fetch("/me").then(r => {
  //     if (r.ok){
  //       r.json().then(user => {
  //         setUser(user);
  //         });
  //     }
  //   })
  //   fetch('/fish')
  //   .then(r => r.json())
  //   .then(fishes => setFishList(fishes));
  //   },[]);

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

  // function handleLogOut(){
  //   fetch("/logout", {
  //     method: "DELETE"
  //   })
  //   .then(r=> {
  //     if(r.ok){
  //       setUser(null);
  //     }
  //   });
  // }

    return (
      <UserProvider>
        <div className="App container padding-top">
          <BrowserRouter>
            <Routes>
              <Route index element={<LogIn/>}></Route>
              <Route path="/login" element={<LogIn/>}></Route>
              {/* <Route path='/home' element={<LogIn onLogIn={handleLogIn}/>}></Route> */}
              <Route element={<NavBar/>}>
                <Route path='/myAquariums' element={<AquariumContainer showAll={false}/>}></Route>
                <Route path='/aquariums' element={<AquariumContainer showAll={true}/>}></Route>
                <Route path='/fish' element={<AllFish/>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </UserProvider>
    );
}

export default App;
