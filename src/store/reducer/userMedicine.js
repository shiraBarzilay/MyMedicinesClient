import * as Types from "../actions/userMedicine";

const initialState={
    userMedicinesArr:[],
    curretntUserMedicine:[],
}

export const userMedicineReducer=(state=initialState,action)=>{
switch(action){
    case Types.ADD_DETAILS_OF_MEDICINE:
        return{
            userMedicinesArr:[...state.userMedicinesArr,action]   
        }
    case Types.SET_USER_MEDICINES:
        return{
             ...state,
             curretntUserMedicine:action.payload
        }
    default :return state;
}
}