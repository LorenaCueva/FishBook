import {NavLink, Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar({user, onLogOut}){

    console.log("user:", user)

    // const navigate = useNavigate();

    return(
    <div>
        <nav className='cyan darken-3'>
            <div className="nav-wrapper">
                <div className="brand-logo right">{user ? `${user.username}'s Fishbook` : null}</div>
                <ul className="left padding-left hide-on-med-and-down">
                    <li><NavLink to="/login" onClick={onLogOut}>LogOut</NavLink></li>
                    <li><NavLink to="/myAquariums">My Aquariums</NavLink></li>
                    <li><NavLink to="">My Fish</NavLink></li>
                    <li><NavLink to="">My Activity</NavLink></li>
                {/* </ul> */}
                {/* <ul className="right hide-on-med-and-down"> */}
                    <li><NavLink to="">Fish</NavLink></li>
                    <li><NavLink to="">Community</NavLink></li>
                    {/* <li><h5>{user ? user.username : null}</h5></li> */}
                </ul>
            </div>
        </nav>
        <div>
                <Outlet/>
        </div>
    </div>
    )
}
export default NavBar;