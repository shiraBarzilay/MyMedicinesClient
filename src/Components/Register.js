import * as React from 'react';
import { useState } from 'react';
import "../ComponenetsStyle/Register.scss"
import { connect, useDispatch } from 'react-redux';
import { addNewUser } from '../store/actions/user';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import utils from '../utils';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    let [user, setUser] = useState({
        UserFirstName: "",
        UserLastName: "",
        UserPassword: "",
        UserEmail: "",
        UserBirthDate: "",
        UserAddress: "",
        UserCity: ""
    });
    let [errorsMessage, setErrorsMessage] = useState([]);

    const navigate = useNavigate();

    // let dispatch=useDispatch();//מעדכן בסטיט הכללי




    const changeInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }
    const validation = () => {
        let newErrorsMessage = [];
        let isValidation = true;
        // if(!user.name||!user.name.trim()){
        //     isValidation=false;
        //     newErrorsMessage.name={message:"שדה חובה"};
        // }
        console.log(user);
        if (!user.UserPassword || !user.UserEmail) {
            isValidation = false;
            newErrorsMessage.push("מייל וסיסמה אלו שדות חובה");
        }
        if (user.UserPassword.length < 5 || !(/(?=[A-Z]*)(?=[a-z]*)(?=[0-9]*)/.test(user.UserPassword))) {
            isValidation = false;
            newErrorsMessage.push("סיסמא לא תקינה");
        }
        setErrorsMessage(newErrorsMessage);
        return isValidation;
    }

    const register = async (e) => {
        e.preventDefault();
        if (validation()) {
            let result = await utils.signUp(user);
            console.log(result);
            if (result.data != null && result.data != "") {
                props.signUp(user);
                navigate("/medicationLog");
            }
            else {
                setErrorsMessage(["כתובת המייל שהוזנה כבר רשומה באתר"]);
            }
        }
    }
    return (
        <div className="wrap-register">

            <form className='detailInput'>
                <h3>עלייך להרשם!</h3>
                <input type="text" className="inp" name='UserFirstName' placeholder="שם פרטי" onChange={changeInput} />
                <input type="text" className="inp" name='UserLastName' placeholder="שם משפחה" onChange={changeInput} />
                <input type="password" className="inp" name='UserPassword' placeholder="סיסמא" onChange={changeInput} />
                <input type="email" className="inp" name='UserEmail' placeholder="מייל" onChange={changeInput} />
                <label>תאריך לידה</label>
                <input type="date" className="inp" name='UserBirthDate' placeholder="תאריך לידה" onChange={changeInput} />

                <input type="text" className="inp" name='UserAddress' placeholder="כתובת" onChange={changeInput} />
                <input type="text" className="inp" name='UserCity' placeholder="עיר" onChange={changeInput} />

                {errorsMessage.length != 0 && <div className="result">
                    {errorsMessage.map((error, i) => <p key={i}><ExclamationTriangleFill /> {error}</p>)}
                </div>}
                <input type="button" className="button" value="הרשמה" onClick={register} />
            </form>
            <p>משתמש רשום? עבור ל<a href="/home" className="link">התחברות</a></p>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (user) => dispatch(addNewUser(user))
    };
};
export default connect(null, mapDispatchToProps)(Register);