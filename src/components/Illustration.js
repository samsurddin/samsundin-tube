import classes from '../styles/Illustration.module.css';
import signupImage from '../assets/images/signup.svg';

function Illustration() {
  return (
    <div>
       <div class={classes.illustration}>
            <img src={signupImage} alt="Signup" />
          </div>
    </div>
  );
}

export default Illustration;
