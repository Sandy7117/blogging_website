import React, { useState, useContext, useRef, useEffect } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import Classes from "./UpdateData.module.css";
import AuthContext from "../../store/auth-context";
import api from "../../store/api";
import image from '../../Images/editpageimage/que-es-un-blog.webp'

const UpdateData = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const setUserEmail = authCtx.userEmail;
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();
  const history = useHistory();
  const [data, setData] = useState({});
  
  useEffect(()=>{
    api.get(`user/${props.match.params.id}.json`)
  .then(function(response){
    setData(response.data)
  })
  .catch(function (error){
    history.push("/homepage");
  })
  },[props.match.params.id,authCtx,history])
  
  
  const submitHandler = (event) => {
    event.preventDefault();
      api.put(`user/${props.match.params.id}.json`,{
      image: imageInputRef.current.value,
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
      email: setUserEmail,
    })
    .then(function(response){
      history.push("/homepage");
    })
    .catch(function(error){
      history.push("/homepage");
    })
    
  };

  return (
    <div>
      <header className={Classes.header}>
        {isLoggedIn && (
          <div>
            <Link to="/homepage">
              <button type="button" className="btn btn-dark">
                Homepage
              </button>
            </Link>
          </div>
        )}
      </header>

      <div className={Classes.body}>
        <div>
          <img
            src={image}
            style={{ width: "100%", height: "70vh", margin: "100px" }}
            alt="img"
          />
        </div>
        <div style={{ width: "100%", height: "70vh", margin: "10px" }}>
          <div className="h4 text-center py-4">
            <h1>Update your blog</h1>
            <form onSubmit={submitHandler} className={Classes.form}>
              <label className="black-text font-weight-light" htmlFor="image">
                Image url
              </label>
              <br />
              <input
                type="text"
                id="image"
                style={{ width: "100%", height: "5vh" }}
                defaultValue={data.image}
                ref={imageInputRef}
                className="form-control"
              />
              <br />

              <label className="black-text font-weight-light" htmlFor="title">
                Title
              </label>
              <br />
              <input
                type="text"
                id="title"
                style={{ width: "100%", height: "5vh" }}
                defaultValue={data.title}
                ref={titleInputRef}
                className="form-control"
              />
              <br />

              <label
                className="black-text font-weight-light"
                htmlFor="description"
              >
                Description
              </label>
              <br />
              <textarea
                type="text"
                id="description"
                placeholder="Enter the description"
                style={{ width: "100%", height: "20vh" }}
                defaultValue={data.description}
                ref={descriptionInputRef}
                className="form-control"
              />
              <br />
              <div>
              <button type="submit" className="btn btn-outline-purple">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateData);
