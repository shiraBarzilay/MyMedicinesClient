import * as Types from "./Types";

//הוספת תרופה חדשה שלא קיימת במאגר התרופות של האתר שלנו
export const addNewMedicine = (medicine) => {
    return {
        type: Types.ADD_NEW_MEDICINE,
        payload: medicine
    }
}

export const getMedicineFromServer = (medicinesArr) => {
    return {
        type: Types.GET_MEDICINE_FROM_SERVER,
        payload: medicinesArr
    }
}
//אין אפשרות מחיקת תרופה באתר שלנו!!!!!