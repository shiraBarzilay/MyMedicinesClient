import * as Types from "./Types";


//הוספת פרטי תרופה לפי רצון הלקוח 
export const addDetailsOfMedicine=(detailOneMedicine)=>{
return{
    type:Types.ADD_DETAILS_OF_MEDICINE,
    payload:detailOneMedicine
}
}

// עדכון פרטי תרופה שהלקוח לוקח (מינון לקיחה,ימי לקיחה וכד)
export const updateDetailsOfMedicine=(detailOneMedicine)=>{
    return{
        type:Types.UPDATE_DETAILS_OF_MEDICINE,
        payload:detailOneMedicine
    }
}