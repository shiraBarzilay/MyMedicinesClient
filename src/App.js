
import Home from "./Components/Home";
import Register from "./Components/Register";
import { Routes ,Route} from "react-router-dom";
import NavbarUser from "./Components/NavbarUser";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
const App=()=>{
return (
<>
<NavbarUser />
<Routes>
    <Route path='home' element={<Home />}/>
    <Route path='register' element={<Register />}/>
    <Route path='contactUs' element={<ContactUs />}/>
    <Route path='aboutUs' element={<AboutUs />}/>
    <Route path='*' element={<Home />} />
  <Route path='' element={<Home />} />
</Routes>
</>
)
}
export default App;
