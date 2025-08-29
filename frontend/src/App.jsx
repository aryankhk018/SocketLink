import "./App.css";
import Landing from "./pages/Landing";
import { HashRouter, Routes, Route } from "react-router-dom";
import Authenctication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Landing />,
  //   },
  //   {
  //     path: "/auth",
  //     element: <Authenctication />,
  //   },
  //   {
  //     path: "/:url",
  //     element: <VideoMeet />,
  //   },
  //   {
  //     path: "/home",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/history",
  //     element: <History />,
  //   },
  // ]);
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authenctication />} />
            <Route path="/:url" element={<VideoMeet />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </>
  );
}

export default App;
