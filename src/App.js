import Home from "./Components/Home";
import Register from "./Components/Register";
import { Routes, Route } from "react-router-dom";
import NavbarUser from "./Components/NavbarUser";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import Medicines from "./Components/Medicines";
import MedicationLog from "./Components/MedicationLog";
import "./App.css";

const App = () => {
  return (
    <div className="wrap-app">
      <NavbarUser />

      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='contactUs' element={<ContactUs />} />
        <Route path='aboutUs' element={<AboutUs />} />
        <Route path='medicines' element={<Medicines />} />
        <Route path='medicationLog' element={<MedicationLog />} />
        <Route path='*' element={<Home />} />
        <Route path='' element={<Home />} />
      </Routes>
    </div>
  )
}
export default App;
