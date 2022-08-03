import Classes from "./Homepage.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";
import Showdata from "./Showdata";
import axios from "axios";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const Homepage = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [userfetchData, setUserData] = useState([]);
  const [error, setError]=useState(null)

  
  const logoutHandler = () => {
    authCtx.logout();
  };
  useEffect(() => {
    axios.get("https://blog-2f6c3-default-rtdb.firebaseio.com/user.json")
    .then(function(response){
      const loadedData = [];
      for (const key in response.data) {
        loadedData.push({
          ...response.data[key],
          id:key
        });
      }
      setUserData(loadedData);
      console.log(loadedData)
    })
    .catch(function(error){
      setError('Something went wrong')
    })
  }, []);

  return (
    <div>
      <header className={Classes.header}>
        <div>
          <h2>All posts</h2>
        </div>
        <div><h4>Contact Us</h4></div>

        <div className={Classes.header}>

          {!isLoggedIn && (
            <div style={{ marginRight:'20px'}}>
              <Link to="/login">
                <button type = 'button' className='btn btn-primary'>Login</button>
              </Link>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Link to="/signup">
                <button type = 'button' className='btn btn-primary'>Signup</button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div style={{ marginRight:'20px'}}>
              <Link to="/login/createpost">
                <button type = 'button' className='btn btn-info'>Create Post</button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <Link to="/homepage">
                <button type = 'button' className='btn btn-danger' onClick={logoutHandler}>
                  Log out
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>


            <p>{error}</p>
      {!isLoggedIn && (
        <div>
          <h1 style={{ fontWeight:'bold',marginTop:'60px', marginBottom:'60px' }}>Welcome To This Blogging Website</h1>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <h1 style={{ fontWeight:'bold' }}>Now you can create your own blog</h1>
        </div>
      )}
      <div className={Classes.body}>
        <div>
          <Showdata passData={userfetchData} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
