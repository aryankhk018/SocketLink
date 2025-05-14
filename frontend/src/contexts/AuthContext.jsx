import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../enviroment.js";
import server from "../enviroment.js";

const AuthContext = createContext({});
const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});
// const client = axios.create({
//   baseURL: "http://localhost:8000",
// });

const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  // const router = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === 201) {
        return request.data.message;
      }
    } catch (err) {
      if (err.response && err.response.status === 302) {
        return err.response.data.message;
      }
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      if (request.status === 200) {
        localStorage.setItem("token", request.data.token);
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const request = await client.get("/get_all_activity", {
        params: { token: localStorage.getItem("token") },
      });
      console.log(request.data);

      return request.data;
    } catch (error) {
      throw error;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      const request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });

      return request.status;
    } catch (error) {
      throw error;
    }
  };
  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider, AuthContext };
