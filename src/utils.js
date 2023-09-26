import axios from "axios";

const baseUrl = 'https://localhost:44378/api/';

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
    return await axios.get(`${baseUrl}Medicines/GetSignedMedicines?userId=${userId}`);
}

const addMedicine = async (imageFile, medicine) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("medicine", JSON.stringify(medicine));
    return await axios.post(`${baseUrl}Medicines/AddMedicine`, formData)
}

export default {
    login,
    signUp,
    getAllMedicines,
    getMedicinesByUser,
    getSignedMedicines,
    addMedicine
};
