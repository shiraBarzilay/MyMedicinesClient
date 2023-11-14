import * as Types from "./Types";


//הוספת פרטי תרופה לפי רצון הלקוח 
export const addDetailsOfMedicine=(detailOneMedicine)=>{
return{
    type:Types.ADD_DETAILS_OF_MEDICINE,
    payload:detailOneMedicine
}
}
