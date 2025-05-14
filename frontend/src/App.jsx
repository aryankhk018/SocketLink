import { useState } from "react";

import "./App.css";
import Landing from "./pages/Landing";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authenctication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import VideoMeetComponent from "./pages/VideoMeet.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/auth",
      element: <Authenctication />,
    },
    {
      path: "/:url",
      element: <VideoMeet />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/history",
      element: <History />,
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
