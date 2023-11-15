import { useState } from "react";
import utils from "../utils";
import { useNavigate } from "react-router-dom";
import "../ComponenetsStyle/Home.scss";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { login } from "../store/actions/user";
import { connect } from "react-redux";

const Home = (props) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    // התחברות
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.email != "" && formData.password != "") {
            console.log("waiting.....");
            // קריאה לשרת- C#,
            // שיבדוק אם המשתמש קים ב 
            // DB- ב SQL
            let result = await utils.login(formData);
            let user = result.data;
            if (user != null && user != "") {
                props.login(user);
                // העברה לדף יומן תרופות
                navigate("/medicationLog");
            }
            else {
                setErrorMsg("המשתמש לא קיים. ייתכן שהמייל או הסיסמה שגויים");
            }
        }
        else {
            setErrorMsg("יש למלא את כל השדות");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <div className="wrap-home">
            <div className="textWrite">
                <b><p>התרופות שלך,</p></b>
                <b> <p> זה הדבר הראשון שלנו!</p></b>
            </div>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" className="inp" placeholder="מייל" onChange={handleChange} />
                <input name="password" type="password" className="inp" placeholder="סיסמא" onChange={handleChange} />

                {errorMsg != null && <div className="result">
                    <p><ExclamationTriangleFill /> {errorMsg}</p>
                </div>}

                <input type="submit" className="buttonLogin" value="התחברות" />
            </form>
            <p>משתמש חדש? עבור ל<a href="/register" className="link">הרשמה</a></p>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    };
};
export default connect(null, mapDispatchToProps)(Home);