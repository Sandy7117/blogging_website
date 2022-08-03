import { useRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";
import '../../../node_modules/font-awesome.css/css/font-awesome.css'
import axios from "axios";

const Login = () => {
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
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBK_z-8jgwjnInJCSsh-R6h-p8bJM6mzZ8",userLoginData,{
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
    
    <section className={classes.login}>
      <h1 className={classes.bgheading}>Login</h1>
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
            defaultValue=""
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type = 'submit'>Login</button>
        </div>
        <div className={classes.actions}>
          {
            <Link to="/homepage">
              <button type = 'button'>Go to homepage</button>
            </Link>
          }
        </div>
      </form>
      {showError && <p>Loading...</p>}
    </section>
  );
};

export default Login;
