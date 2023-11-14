import * as Types from "../actions/Types";


const initialState = {
    medicinesArr: []
}

export const medicineReducer = async (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_NEW_MEDICINE:
            return {
                medicinesArr: [state.medicinesArr, action.payload]
            }
        case Types.ADD_MEDICINE_TO_USER:
            const medicines = [...state.medicinesArr || []];
            if (medicines?.[medicines?.indexOf(action.payload.medicine)]) {
                medicines[medicines.indexOf(action.payload.medicine)].isExist_ToCurrentUser = true;
            }
            return {
                medicinesArr: [...medicines || []]
            }
        case Types.GET_MEDICINE_FROM_SERVER:
            return { medicinesArr: action.payload }
        default: return state;
    }
}

