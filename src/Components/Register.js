import * as React from 'react';
import { useState } from 'react';
import "../ComponenetsStyle/Register.css"

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
    alert("success");
    console.log(errorsMessage)

}
}
return(
    <>
    <div className='detailInput'>
           <input type="text" className="inp" name='UserFirstName' placeholder="שם פרטי"/>
           <input type="text" className="inp" name='UserLastName' placeholder="שם משפחה"/>
           <input type="password" className="inp" name='UserPassword' placeholder="סיסמא" onChange={changeInput}/>
           <input type="email" className="inp" name='UserEmail'  placeholder="מייל"/>
           <input type="date" className="inp" name='UserBirthDate'  placeholder="תאריך לידה"/>
           <input type="text" className="inp" name='UserAddress'  placeholder="כתובת"/>
           <input type="text" className="inp" name='UserCity'  placeholder="עיר"/>

        {/* <h1>Hello,Please Register!</h1>
    <Box>
   <TextField id="standard-basic" label="Name" name="name" variant="standard" onChange={changeInput} />
   <TextField id="standard-basic" label="Password"  name="password" type="password" variant="standard" onChange={changeInput} />
   <TextField id="standard-basic" label="Age"  name="age" variant="standard" />
   <TextField id="standard-basic" label="City" name="city" variant="standard" />
   <TextField id="standard-basic" label="Address" name="address" variant="standard" />
   <TextField id="standard-basic" label="Email" name="email" type="email" variant="standard"  />
   <Button variant="outlined" onClick={register}>Register</Button>
 </Box> */}
   </div>
   <input type="button" class="button" value="הרשמה" onClick={register}/>
   </>
)    
}