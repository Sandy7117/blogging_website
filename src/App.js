import "./App.css";
import Login from "./Components/Loginpage/Login";
import Signuppage from "./Components/Signuppage/Signuppage";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import CreatePostpage from "./Components/CreatePostpage/CreatePostpage";
import UpdateData from "./Components/Homepage/UpdateData";

function App() {
  const authCtx = useContext(AuthContext);
  

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/homepage" />
      </Route>

      <Route path="/homepage">
        <Homepage />
      </Route>

      {!authCtx.isLoggedIn && (
        <Route path="/login" exact>
          <Login />
        </Route>
      )}

      {!authCtx.isLoggedIn && (
        <Route path="/signup">
          <Signuppage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/login/createpost">
          <CreatePostpage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/updatedata/:id">
          <UpdateData />
        </Route>
      )}

      <Route path="*">
        <h1>Page not found</h1>
      </Route>
    </Switch>
  );
}

export default App;
