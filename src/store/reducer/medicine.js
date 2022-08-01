import * as Types from "../actions/Types";


const initialState={
    medicinesArr:[]
}

export const medicineReducer=(state=initialState,action)=>{
switch(action.type){
    case Types.ADD_MEDICINE:
        return {
          medicinesArr:[state.medicinesArr,action.payload]  
        }
    case Types.GET_MEDICINE_FROM_SERVER:
        return{
            medicinesArr:action.payload
        }
}
}

