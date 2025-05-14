import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import styles from "../styles/homeComponent.module.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
const Home = () => {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    if (meetingCode === "") {
      navigate("/home");
    }
    navigate(`/${meetingCode}`);
  };
  return (
    <>
      <div className={styles.navBar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginLeft: "20px" }}>Socket Link</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className={styles.meetContainer}>
        <div className={styles.leftPanel}>
          <h2 style={{ marginBottom: "20px" }}>
            Connect instantly. Talk freely. Your meetings, made simple.
          </h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              placeholder="Meeting Code"
              value={meetingCode || ""}
            ></TextField>

            <Button onClick={handleJoinVideoCall} variant="contained">
              Join
            </Button>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <img src="logo.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
