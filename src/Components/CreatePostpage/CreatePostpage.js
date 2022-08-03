import Classes from "./CreatePostpage.module.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import api from "../../store/api";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import image from "../../Images/HomeImage/crearblog-1.jpg";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const CreatePostpage = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const setUserEmail = authCtx.userEmail;
  const history = useHistory();
  const [showError, setShowError] = useState(null);

  const [enteredName, setEnteredName] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const [enteredDescTouched, setEnteredDescTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const titleInputIsValid = !enteredTitleIsValid && enteredTitleTouched;
  const enteredDescriptionIsValid = enteredDescription.trim() !== "";
  const descInputIsValid = !enteredDescriptionIsValid && enteredDescTouched;

  const imageHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const descriptionHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const titleInputBlurHandler = (event) => {
    setEnteredTitleTouched(true);
  };
  const descInputBlurHandler = (event) => {
    setEnteredDescTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setShowError(null);

    setEnteredNameTouched(true);
    setEnteredTitleTouched(true);
    setEnteredDescTouched(true);

    if (!enteredNameIsValid) {
      return;
    }
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }

    api
      .post("user.json", {
        image: enteredName,
        title: enteredTitle,
        description: enteredDescription,
        email: setUserEmail,
      })
      .then(function (response) {
        history.push("/homepage");
      })
      .catch(function (error) {
        history.push("/homepage");
      });
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
            <h1>Create your blog</h1>
            <form onSubmit={submitHandler} className={Classes.form}>
              <label className="black-text font-weight-light" htmlFor="image">
                Image url
              </label>
              <br />
              <input
                type="text"
                id="image"
                placeholder="Enter the image url"
                style={{ width: "100%", height: "5vh" }}
                onChange={imageHandler}
                onBlur={nameInputBlurHandler}
                className="form-control"
              />
              {nameInputIsValid && (
                <p style={{ color: "red" }}>Image input cannot be empty</p>
              )}
              <br />

              <label className="black-text font-weight-light" htmlFor="title">
                Title
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Enter the title"
                style={{ width: "100%", height: "5vh" }}
                onChange={titleHandler}
                onBlur={titleInputBlurHandler}
                className="form-control"
              />
              {titleInputIsValid && (
                <p style={{ color: "red" }}>Title input cannot be empty</p>
              )}
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
                onChange={descriptionHandler}
                onBlur={descInputBlurHandler}
                className="form-control"
              />
              {descInputIsValid && (
                <p style={{ color: "red" }}>
                  Description input cannot be empty
                </p>
              )}
              <br />
              <div>
                <button type="submit" className="btn btn-outline-purple">
                  Submit
                </button>
                <p>{showError}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostpage;
