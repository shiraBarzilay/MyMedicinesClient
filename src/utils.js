import axios from "axios";
import { Day, Hour } from "./Components/AddExistingMedicineToUser";

const baseUrl = 'https://localhost:44378/api/';

// דף קריאות לשרת
// מפנה לקונטרולר בסי שארפ 

const login = async (data) => {
    return await axios.get(`${baseUrl}Users/Login?userEmail=${data.email}&userPassword=${data.password}`);
}

const signUp = async (user) => {
    return await axios.post(`${baseUrl}Users/SignUp`, user);
}

const getAllMedicines = async () => {
    return await axios.get(`${baseUrl}Medicines/GetMedicines`);
}

const getMedicinesByUser = async (userId) => {
    return await axios.get(`${baseUrl}Medicines/GetMedicinesByUser?userId=${userId}`);
}

const getSignedMedicines = async (userId) => {
    // שליפת התרופות שקימות במערכת
    return await axios.get(`${baseUrl}Medicines/GetSignedMedicines?userId=${userId}`);
}

const getMedicinesToUser = async (userId) => {
    return await axios.get(`${baseUrl}Users/GetMedicinesToUser?userId=${userId}`);
}

const addMedicine = async (imageFile, medicine) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("medicine", JSON.stringify(medicine));
    return await axios.post(`${baseUrl}Medicines/AddMedicine`, formData)
}

const addMedicineToUser = async (userId, medicineId, hour, startDate, endDate) => {
    // mtu = medicineToUser
    const mtu = {
        medicineId,
        userId,
        takingHour: new Date("2000-01-01T" + Hour[hour]),
        takingDay: 1,
        startingDate: startDate,
        lastUpdatedDate: endDate
    }
    return await axios.post(`${baseUrl}Users/AddExistingMedicineToUser`, mtu)
}

const removeMedicineToUser = async (id) => {
    return await axios.put(`${baseUrl}Users/UpdateMedicineToUser?mtuId=${id}&status=${false}`, null);
}

export default {
    login,
    signUp,
    getAllMedicines,
    getMedicinesByUser,
    getSignedMedicines,
    addMedicine,
    addMedicineToUser,
    getMedicinesToUser,
    removeMedicineToUser
};
