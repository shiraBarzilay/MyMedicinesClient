import * as Types from "./Types";


export const addMedicine=(medicine)=>{
return{
    type:Types.ADD_MEDICINE,
    payload:medicine
}
}

export const getMedicineFromServer=(medicinesArr)=>{
return{
    type:Types.GET_MEDICINE_FROM_SERVER,
    payload:medicinesArr
}
}