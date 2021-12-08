// Login page
import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  // variable names are self explanatory in what they are used for
  const userEmail = useRef();
  const userPass = useRef();
  const [isLogging, setIsLogging] = useState(false);
  const authContxt = useContext(AuthContext);
  const Spinner = () => <div className="myspinner"></div>;
  const myHistory = useHistory();
  const submitForm = (event) => {
    // when user clicks submit button
    event.preventDefault();
    setIsLogging(true);

    const enteredEmail = userEmail.current.value;
    const enteredPassword = userPass.current.value;

    // optional: Add validation
    
    // firebase authentication
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhi9U8enoQsrbBF_coz9zM1hUnZOw4Yj4',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      setIsLogging(false);
      if (res.ok) {
        // authentication success
        return res.json();
        // ...
      } else {
        return res.json().then((data) => {
          // show an error modal
          let errorMessage = 'Failed to Login';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    })
    .then(data => {
      // redirecting user
      authContxt.login(data.idToken, enteredEmail);
      myHistory.replace('/');
    })
    .catch(err => {
      console.log(err.message);
    });
  };
  // rendering componenets
  return (
    <div className="container main-wrapper">
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="card border-0 myCardd" >
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="mb-5">
                      <h3 className="h4 font-weight-bold text-theme">Login</h3>
                    </div>

                    <h6 className="h5 mb-0">Welcome back!</h6>
                    <p className="text-muted mt-2 mb-5">Enter your email address and password to access admin panel.</p>

                    <form onSubmit={submitForm}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" required ref={userEmail} />
                      </div>
                      <div className="form-group mb-5">
                        <label htmlFor="password">Password</label>
                        <input type="password" ref={userPass} className="form-control" id="password" />
                      </div>
                      {!isLogging && <button type="submit" className="btn btn-theme">Login</button>}
                      {isLogging && <Spinner/>}
                      <a href="#l" className="forgot-link float-right text-primary">Forgot password?</a>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6 d-none d-lg-inline-block">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right"></div>
                    <div className="account-testimonial">
                      <p className="lead text-white">"One does not climb to attain enlightenment, rather one climbs because they are enlightened."</p>
                      <p>- Zen Master Futomaki</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>


          <p className="text-muted text-center mt-3 mb-0">Don't have an account? <Link to='/signup'> Create new account</Link></p>



        </div>

      </div>

    </div>

  );
};

export default AuthForm;


