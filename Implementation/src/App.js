import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import HomeLoggedinPage from './pages/HomeLoggedinPage';
import SignUpPage from './components/Auth/SignUpForm';
import Membership from './pages/Membership';

function App() {
  const authContxt = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {authContxt.isLoggedIn && <HomeLoggedinPage />}
          {!authContxt.isLoggedIn && <HomePage />}

        </Route>
        {!authContxt.isLoggedIn && (
          <Route path='/login'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authContxt.isLoggedIn && <UserProfile />}
          {!authContxt.isLoggedIn && <Redirect to='/login' />}
        </Route>

        {authContxt.isLoggedIn && <Route path='/membership'>
          <Membership />
        </Route>
        }

        {!authContxt.isLoggedIn && (
          <Route path='/signup'>
            <SignUpPage />
          </Route>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
