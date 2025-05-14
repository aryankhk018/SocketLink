import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const History = () => {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeto = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {}
    };

    fetchHistory();
  }, []);

  let formatDate = (DateString) => {
    let date = new Date(DateString);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <IconButton
        onClick={() => {
          routeto("/home");
        }}
      >
        <HomeIcon />
      </IconButton>
      <hr />
      {meetings.length == 0 ? (
        <h1>No meetings till now </h1>
      ) : (
        meetings.map((e, i) => {
          return (
            <>
              <Card key={i} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Code : {e.meetingCode}
                  </Typography>

                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Date: {formatDate(e.date)}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })
      )}
    </>
  );
};

export default History;
