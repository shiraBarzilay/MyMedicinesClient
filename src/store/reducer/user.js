import * as Types from "../actions/Types";

const initialState={
    usersArr:[],
    currentUser:{}
}

export const userReducer=(state=initialState,action)=>{
switch(action.type){
   case Types.ADD_NEW_USER :
     return{
     usersArr:[...state.usersArr,action.payload]
     }
    case Types.DELETE_USER :
      let arr=state.usersArr.filter(user=>user.UserId!==action.payload)
      return{
        usersArr:arr
      }
    default :return state;
}
}