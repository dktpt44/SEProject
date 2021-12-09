import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <div className="container">
        <div className="row">

          <h1>Your User Profile</h1>
        </div>
      </div>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
