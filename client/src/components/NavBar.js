import {NavLink, Outlet} from 'react-router-dom';
import {useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";

function NavBar(){

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogOut() {
        try {
          await LogOut();
          navigate("/login");
        } catch (error) {
          console.error(error);
        }
      }
      
      async function LogOut() {
        try {
          const response = await fetch("/logout", {
            method: "DELETE",
          });
          if (response.ok) {
            setUser(null);
          }
        } catch (error) {
          console.error(error);
        }
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