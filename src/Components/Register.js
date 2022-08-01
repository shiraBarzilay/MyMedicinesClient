import * as React from 'react';
import { useState } from 'react';
import "../ComponenetsStyle/Register.css"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../store/actions/user';

export default function Register(){

let [user,setUser]=useState({
    UserFirstName:"",
    UserLastName:"",
    UserPassword:"",
    UserEmail:"",
    UserBirthDate:"",
    UserAddress:"",
    UserCity:""
});
let [errorsMessage,setErrorsMessage]=useState({});
// let navigate=useNavigate();

// let dispatch=useDispatch();//מעדכן בסטיט הכללי




const changeInput=(e)=>{
    let inputName=e.target.name;
    let inputValue=e.target.value;
    setUser({...user,[inputName]:inputValue})
}
const validation=()=>{
    let newErrorsMessage={};
    let isValidation=true;
    // if(!user.name||!user.name.trim()){
    //     isValidation=false;
    //     newErrorsMessage.name={message:"שדה חובה"};
    // }
    if(!user.UserPassword){
        isValidation=false;
        newErrorsMessage.UserPassword={message:"שדה חובה"};
    }
    if(user.UserPassword.length<5 ||!(/(?=[A-Z]*)(?=[a-z]*)(?=[0-9]*)/.test(user.UserPassword))){
        isValidation=false;
        newErrorsMessage.UserPassword={message:"סיסמא לא תקינה"} 
    }
    setErrorsMessage(newErrorsMessage);
    return isValidation;
}
const register=(e)=>{
     e.preventDefault();
    if(!validation()){
    alert("Something Broken")
    console.log(errorsMessage)
}
    else{
    // axios.post("http://localhost:3000/user",user).then(res=>{
    // dispatch(addUser(user));
    // })
    console.log("register!!")
    console.log(errorsMessage)

}
}
return(
    <>
    
    <div className='detailInput'>
        <h3>עלייך להרשם!</h3>
           <input type="text" className="inp" name='UserFirstName' placeholder="שם פרטי" />
           <input type="text" className="inp" name='UserLastName' placeholder="שם משפחה"/>
           <input type="password" className="inp" name='UserPassword' placeholder="סיסמא" onChange={changeInput}/>
           <input type="email" className="inp" name='UserEmail'  placeholder="מייל"/>
           <label>תאריך לידה</label>
           <input type="date" className="inp" name='UserBirthDate'  placeholder="תאריך לידה"/>
          
           <input type="text" className="inp" name='UserAddress'  placeholder="כתובת"/> 
           <input type="text" className="inp" name='UserCity'  placeholder="עיר"/>
   </div>
   <input type="button" class="button" value="הרשמה" onClick={register}/>
   </>
)    
}