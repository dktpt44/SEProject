// signup form
import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const FIREBASE_DOMAIN = 'https://seprojectgroup-default-rtdb.firebaseio.com/';

const SignUpForm = () => {
  // variable names are self explanatory
  const userEmail = useRef();
  const userPass = useRef();
  const userNamex = useRef();
  const [isLogging, setIsLogging] = useState(false);
  const authContxt = useContext(AuthContext);
  const Spinner = () => <div className="myspinner"></div>;
  const myHistory = useHistory();
  const submitForm = (event) => {
    // clicks sign up button
    event.preventDefault();
    setIsLogging(true);

    const enteredEmail = userEmail.current.value;
    const enteredPassword = userPass.current.value;
    const enteredName = userNamex.current.value;
    // optional: Add validation


    // registering user to the system
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhi9U8enoQsrbBF_coz9zM1hUnZOw4Yj4',
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
    ).then((res) => {

      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          // show an error modal
          let errorMessage = 'Failed to sign up';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    })
      .then(data => {
        // success
        if (data) {
          const sendData = {
            name: enteredName,
            email: enteredEmail,
            noOfBookingsMade: 0,
            isMembershipActive: false,
            bookings: ["dummy"]
          };
          // save booked data:
          fetch(`${FIREBASE_DOMAIN}/allbookings.json`, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(response => response.json())
            .then(() => {
              setIsLogging(false);
              // redirecting users
              authContxt.login(data.idToken, enteredEmail);
              myHistory.replace('/');
            })
            .catch(() => {
              console.log("ERRor!");
            });

        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // rendering user layout
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
                      <h3 className="h4 font-weight-bold text-theme">Sign Up</h3>
                    </div>

                    <h6 className="h5 mb-0">Welcome!</h6>
                    <p className="text-muted mt-2 mb-5">Please fill the following to sign up</p>

                    <form onSubmit={submitForm}>
                      <div className="form-group">
                        <label htmlFor="name">Name*</label>
                        <input type="text" className="form-control" id="name" required ref={userNamex} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email" className="form-control" id="email" required ref={userEmail} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input type="password" className="form-control" id="password" required ref={userPass} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password2">Re-type Password*</label>
                        <input type="password" className="form-control" id="password2" required />
                      </div>
                      {!isLogging && <button type="submit" className="btn btn-theme">Sign Up</button>}
                      {isLogging && <Spinner />}

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


          <p className="text-muted text-center mt-3 mb-0">Already have an account<Link to='/login'> Login</Link></p>

        </div>

      </div>

    </div>

  );
};

export default SignUpForm;