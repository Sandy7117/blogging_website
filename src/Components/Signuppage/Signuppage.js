import { useRef, useContext ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Signup.module.css";
import axios from 'axios';

const Signup = () => {
  const [showError, setShowError] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const userLoginData = JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
    });


    setShowError(true);
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBK_z-8jgwjnInJCSsh-R6h-p8bJM6mzZ8",userLoginData,{
      'headers':{
        'content-type':'application/json'
      }
    })
    .then(function(response){
      authCtx.login(response.data.idToken);
      authCtx.useemail(response.data.email);
        
      history.push("/homepage");
    })
    .catch(function(error){
      setShowError(false);
      setShowError('Something went wrong')
    })
  };

  return (
    <section className={classes.signup}>
      <h1 className={classes.bgheading}>Signup</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Signup</button>
        </div>
        <p>{showError}</p>
        <div className={classes.actions}>
          {
            <Link to="/homepage">
              <button>Go to homepage</button>
            </Link>
          }
        </div>
      </form>
    </section>
  );
};



export default Signup;
