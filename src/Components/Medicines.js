import * as React from 'react';
import { useNavigate } from "react-router-dom";
import MedicationLog from './MedicationLog';
import { useEffect } from 'react';
import { useState } from 'react';
import utils from '../utils';
import Medicine from './Medicine';
import '../ComponenetsStyle/Medicines.scss';
import { Alert, Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Snackbar, TextField, useTheme } from '@mui/material';
import { connect, useSelector } from 'react-redux';
import { List } from 'dom';
import { Add, Check, Close } from '@mui/icons-material';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { addNewMedicine, getMedicineFromServer } from '../store/actions/medicine';
import { useRef } from 'react';
import AddExistingMedicineToUser from './AddExistingMedicineToUser';

const Medicines = (props) => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ MedicineName: "", MedicineEnglishName: "", MedicineDescription: "", MedicineImage: "" });
  const [showAddMedicineForm, setShowAddMedicineForm] = useState(false);
  const [src, setSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultForm, setResultForm] = useState({ message: "", severity: "" });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const fileInputRef = useRef();

  const currentUser = useSelector(store => store.userReducer.currentUser);

  let navigate = useNavigate();

  useEffect(() => {
    // נקרא לאחר כניסה למערכת
    getMedicines();
  }, [currentUser]);

  useEffect(() => {
    if (openDialog == false) {
      getMedicines();
    }
  }, [openDialog]);

  // 
  const getMedicines = async () => {
    let result;
    if (currentUser != null) {
      // קריאה לשרת לשליפת רשימת התרופות
      result = await utils.getSignedMedicines(currentUser.userId);
    }
    else {
      result = await utils.getAllMedicines();
    }
    // שמירת הנתונים מהשרת בסטייט המקומי
    setMedicines(result.data);
    props.getMedicineFromServer(result.data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMedicine((prevState) => ({ ...prevState, [name]: value }));
  };

  const readURL = (e) => {
    console.log(e);
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setSrc(e.target.result);
      }

      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);
      setNewMedicine((prevState) => ({ ...prevState, MedicineImage: e.target.files[0].name }));
    }
  };
  // 
  const handleSnackClose = () => {
    setOpenSnackBar(false);
  };
  //
  const resetForm = () => {
    setNewMedicine({ MedicineName: "", MedicineEnglishName: "", MedicineDescription: "", MedicineImage: "" });
    fileInputRef.current.files = null;
    setSrc("");
    setShowAddMedicineForm(false);
  };

  const castFieldsToLowerCase = (obj) => {
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newObj = {}
    while (n--) {
      key = keys[n];
      newObj[key[0].toLowerCase() + key.slice(1)] = obj[key];
    }
    return newObj;
  }

  const saveNewMedicine = async (e) => {
    e.preventDefault();
    if (newMedicine.MedicineName != "" && newMedicine.MedicineDescription != "", newMedicine.MedicineEnglishName != "") {
      // שמירה באס קיו אל
      let result = await utils.addMedicine(imageFile, newMedicine);

      if (result.data > 0) {//הקריאה הצליחה
        newMedicine.MedicineId = result.data;
        let _newMedicine = castFieldsToLowerCase(newMedicine);
        props.addNewMedicine(_newMedicine);
        // דחיפת התרופה החדשה לסטייט המקומי
        await setMedicines([...medicines, _newMedicine]);
        setResultForm({ message: "התרופה נוספה בהצלחה!", severity: "success" });
        setOpenSnackBar(true);
        resetForm();
      }
      else if (result.data == 0) {
        setResultForm({ message: "תרופה זו קיימת במאגר התרופות", severity: "error" });
        setOpenSnackBar(true);
      }
      else {
        setResultForm({ message: "קרתה תקלה בהוספת התרופה, נסה שוב מאוחר יותר.", severity: "error" });
        setOpenSnackBar(true);
      }
    }
    else {
      setErrorMsg("יש למלא את כל שדות החובה");
    }
  }

  const handleSelectMedicine = (medicine) => {
    // פונקציה שמועברת לבן- למדיסין, ונקראת בלחיצה על התרופה
    if (!currentUser) {
      setResultForm({ message: "כדי להוסיף תרופות ליומן יש להתחבר לאתר", severity: "info" });
      // פתח פופאפ בראש הדף
      setOpenSnackBar(true);
    }
    else {
      // פתח את הדיאלוג של הוספת תרופה
      // תשלח את openDialog true to AddExistingMedicineToUser component
      setOpenDialog(true);
      setSelectedMedicine(medicine);
    }
  }

  const nav = () => {
    navigate("/medicationLog");
  }

  return (
    <div className="wrap-medicines-page">
      <h3 className="title">התרופות הפופולאריות לבחירה:</h3>
      {/* search-box of medicines by name */}
      <Autocomplete
        id="country-select-demo"
        className="search-box"
        dir="rtl"
        sx={{ width: 250 }}
        options={medicines}
        autoHighlight
        onChange={(event, value) => handleSelectMedicine(value)}
        getOptionLabel={(option) => option.medicineName + " (" + option.medicineEnglishName + ")"}
        renderInput={(params) => (
          <TextField
            {...params}
            label="חיפוש תרופה לפי שם"
            inputProps={{
              ...params.inputProps,
              // autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />

      {/* list of all medicines */}
      {/* מעבר על רשימת התרופות והצגת כל אלמנט שברשימה */}
      <div className="wrap-medicines">
        {medicines?.map((medicine, i) => <Medicine key={i} medicine={medicine} selected={medicine.isExist_ToCurrentUser} onClick={() => handleSelectMedicine(medicine)} />)}
      </div>

      {/* adding new medicine form */}
      {!showAddMedicineForm && <button className="buttonAddMedicine" onClick={() => setShowAddMedicineForm(true)}><Add /> הוספת תרופה חדשה</button>}
      {showAddMedicineForm && <form className="addMedicineForm">
        <button className="buttonClose" onClick={resetForm}><Close /> סגור</button>
        <div className="wrap-inputs">
          <strong>הוספת תרופה חדשה:</strong>
          <input name="MedicineName" value={newMedicine.MedicineName} type="text" className="inp" placeholder="שם תרופה" onChange={handleChange} />
          <input name="MedicineEnglishName" value={newMedicine.MedicineEnglishName} type="text" className="inp" placeholder="שם תרופה באנגלית" onChange={handleChange} />
          <input name="MedicineDescription" value={newMedicine.MedicineDescription} type="text" className="inp" placeholder="תאור תרופה" onChange={handleChange} />
          <label>תמונה של התרופה:</label>
          {/* ? */}
          <input type="file" ref={fileInputRef} onChange={(event) => readURL(event)} />
          {src != "" && src != undefined && src != null && <img src={src} height={100} />}

          {errorMsg != null && <div className="result">
            <p><ExclamationTriangleFill /> {errorMsg}</p>
          </div>}

        </div>
        <button type="submit" className="submitButton" onClick={(e) => saveNewMedicine(e)}><Check /> הוספת תרופה</button>
      </form>}
      {/* הודעה קופצת בראש הדף */}
      <Snackbar dir="rtl" open={openSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleSnackClose} severity={resultForm.severity} sx={{ width: '100%' }}>
          {resultForm.message}
        </Alert>
      </Snackbar>
      {/* // */}
      {/* הוספת תרופה ליומןח */}
      <AddExistingMedicineToUser openDialog={openDialog} selectedMedicine={selectedMedicine} setOpenDialog={(val) => setOpenDialog(val)}
        currentUser={currentUser} />
    </div>
  )
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewMedicine: (medicine) => dispatch(addNewMedicine(medicine)),
    getMedicineFromServer: (medicines) => dispatch(getMedicineFromServer(medicines))
  };
};
export default connect(null, mapDispatchToProps)(Medicines);