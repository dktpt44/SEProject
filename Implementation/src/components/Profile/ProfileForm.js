import classes from './ProfileForm.module.css';

// user profile page
const ProfileForm = () => {

  // rendering view
  return (
    <div className="container">
      <div className="row">

        <form className={classes.form}>
          <div className={classes.control}>
            <label htmlFor='new-password'>New Password</label>
            <input type='password' id='new-password' />
          </div>
          <div className={classes.action}>
            <button>Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
