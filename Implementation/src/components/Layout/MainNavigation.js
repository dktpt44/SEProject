import { Link } from 'react-router-dom';
import { useContext } from 'react';

import './MainNavigation.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authContxt = useContext(AuthContext);
  const isLoggedIn = authContxt.isLoggedIn;
  const logUserOut = () =>{
    authContxt.logout();
  }
  return (
    <div className="mainClass">
      <div className="container">
        <header>
          <Link to='/'>
            <div className="headerTxt" >Booking System</div>
          </Link>
          <nav className="myNavHead">
            <ul>
              {!isLoggedIn &&
                <li>
                  <Link to='/login'>Log in</Link>
                </li>}
              {!isLoggedIn &&
                <li>
                  <Link to='/signup'>Sign up</Link>
                </li>}
              {isLoggedIn &&
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>}

              <li>
                <Link to='/membership'>Membership</Link>
              </li>
              {isLoggedIn &&
                <li>
                  <button onClick={logUserOut}>Logout</button>
                </li>}
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};
export default MainNavigation;
