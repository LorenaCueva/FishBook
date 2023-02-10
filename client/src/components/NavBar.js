import {NavLink, Outlet} from 'react-router-dom';

function NavBar({user, onLogOut}){

    return(
     <div>
        {/* <div className='navbar-fixed'> */}
        <nav className='cyan darken-3'>
            <div className="nav-wrapper">
                <div className="brand-logo right">{user ? `${user.username}'s Fishbook` : null}</div>
                <ul className="left padding-left hide-on-med-and-down">
                    <li><NavLink to="/home" onClick={onLogOut}>LogOut</NavLink></li>
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