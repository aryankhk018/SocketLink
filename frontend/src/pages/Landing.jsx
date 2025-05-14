import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
  const route = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2 id="navHeaderName">Socket Link</h2>
        </div>
        <div className="navLists">
          <p
            onClick={() => {
              route("/guest");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              route("/auth");
            }}
          >
            {" "}
            Register
          </p>
          <button
            className="navLoginButton"
            onClick={() => {
              route("/auth");
            }}
          >
            Login
          </button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your Loved
            Ones
          </h1>
          <p>Cover a distance by Socket Link</p>
          <div role="button" className="getStartedButton">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="../public/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
