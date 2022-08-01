import * as Types from "../actions/Types";

const initialState={
    usersArr:[],

}

export const userReducer=(state=initialState,action)=>{
switch(action.type){
   case Types.ADD_USER :
     return{
     usersArr:[...state.usersArr,action.payload]
     }
}
}