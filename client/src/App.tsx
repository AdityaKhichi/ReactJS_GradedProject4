import NavigationBar from "./components/NavigationBar";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
