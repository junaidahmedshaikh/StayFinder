import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="App">
        <div>
          {/* <Route path="/" element={<Home />} /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
