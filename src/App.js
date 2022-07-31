
import Home from "./Components/Home";
import Register from "./Components/Register";
import { Routes ,Route} from "react-router-dom";
import NavbarUser from "./Components/NavbarUser";
import ContactUs from "./Components/ContactUs";
const App=()=>{
return (
<>
<NavbarUser />
<Routes>
    <Route path='home' element={<Home />}/>
    <Route path='register' element={<Register />}/>
    <Route path='contactUs' element={<ContactUs />}/>
</Routes>
</>
)
}
export default App;
