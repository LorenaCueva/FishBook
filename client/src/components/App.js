import '../App.css';
import LogIn from './LogIn.js'
import M from 'materialize-css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect } from "react";
import AquariumContainer from './AquariumContainer';
import NavBar from './NavBar';
import AllFish from './AllFish';
import { UserProvider } from './UserContext';


function App() {

  useEffect(() =>{
    M.AutoInit();
    },[]);

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
