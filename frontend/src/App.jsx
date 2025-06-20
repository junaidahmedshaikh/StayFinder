import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <div className="App">
        <div>
          <Navbar />
          <Outlet />
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;
