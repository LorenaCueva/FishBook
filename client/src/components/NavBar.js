import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useContext } from 'react';
import { UserContext } from './UserContext';

function NavBar(){

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    function handleLogOut(){
          fetch("/logout", {
            method: "DELETE"
          })
          .then(r=> {
            if(r.ok){
              setUser(user => null);
            }
          });
    }

    return(
     <div>
        {/* <div className='navbar-fixed'> */}
        <nav className='cyan darken-3'>
            <div className="nav-wrapper">
                <div className="brand-logo right">{user ? `${user.username}'s Fishbook` : null}</div>
                <ul className="left padding-left hide-on-med-and-down">
                    <li><NavLink to="/login" onClick={handleLogOut}>LogOut</NavLink></li>
                    <li><NavLink to="/myAquariums">My Aquariums</NavLink></li>
                    <li><NavLink to="/fish">Fish</NavLink></li>
                    <li><NavLink to="/aquariums">Community</NavLink></li>
                </ul>
            </div>
        </nav>
        <div>
            <Outlet/>
        </div>
    </div>
    // </div>
    )
}
export default NavBar;