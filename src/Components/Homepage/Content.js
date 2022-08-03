import React, { useContext} from "react";
import AuthContext from "../../store/auth-context";
import Classes from "./content.module.css";
import { useHistory, Link } from "react-router-dom";
import api from "../../store/api";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Content = (props) => {
  const authCtx = useContext(AuthContext);
  const showDEleteButton = authCtx.isLoggedIn;
  let isSameuser;
  props.email === authCtx.userEmail
    ? (isSameuser = true)
    : (isSameuser = false);
  const history = useHistory();

  const deleteHandler = (postId) => {
    api
      .delete(
        `user/${postId}.json`
      )
      .then(function (response) {
        history.push("/");
      })
      .catch(function (error) {
      });
  };

  return (
    <div className={Classes.row}>
      <div className={Classes.content} 
      >
      <div>
      <img
        className={Classes.img}
        style={{ height: "400px", width: "400px" }}
        src={props.image}
        alt="blog related pic"
      />
      </div>
      <div>
      <h2 style={{ fontWeight: 'bolder' }}>{props.title}</h2>
      <p style={{ textAlign: "justify" }}>{props.description}</p>
      <div className={Classes.buttonCard}>
      {isSameuser && showDEleteButton && (
        <div style={{ marginRight:'20px'}} >
          <button
            type="button"
            className='btn btn-danger'
            onClick={() => deleteHandler(props.id)}
          >
            Delete Post
          </button>
        </div>
      )}
      
      {isSameuser && showDEleteButton && (
        <div>
          <Link to={"updatedata/" + props.id}>
            <button type="button" className='btn btn-info'>
              Edit Post
            </button>
          </Link>
        </div>
      )}
      </div>
      </div>
    </div>
    </div>
  );
};
export default Content;
