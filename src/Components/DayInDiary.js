import React, { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import HourInDay from './HourInDay';
import utils from '../utils';
import { useNavigate } from 'react-router-dom';

const DayInDiary = (props) => {
    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState("");
    const [medicines, setMedicines] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [resultForm, setResultForm] = useState({ message: "", severity: "" });

    const navigate = useNavigate();

    const handleClickOpen = (hour, i) => {
        setOpen(true);
        setHour(hour);
        setMedicines(Object.values(props.dayInWeek.hours)[i]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackClose = () => {
        setOpenSnackBar(false);
    };

    const removeMedicine = async (medicine) => {
        utils.removeMedicineToUser(medicine.id).then(result => {
            if (result.data == true) {
                props.updateLog();
                setResultForm({ message: "התרופה הוסרה בהצלחה!", severity: "success" });
                setOpenSnackBar(true);
                handleClose();
            }
            else {
                setResultForm({ message: "קרתה תקלה בהסרת התרופה, נסה שוב מאוחר יותר.", severity: "error" });
                setOpenSnackBar(true);
            }
        });
    };

    // const fromDate = new Date() - props.offset + 7;
    // const toDate = new Date();

    return (
        <div className="wrap-column">
            <div className="wrap-title"><strong>{props.dayInWeek.day}</strong></div>
            {Object.keys(props.dayInWeek.hours).map((hour, i) => <HourInDay key={i} i={i} hour={hour} dayInWeek={props.dayInWeek}
                onClick={() => handleClickOpen(hour, i)} />)}

            <Dialog
                className="dialog"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"תרופות ליום " + props.dayInWeek.day + " בשעה " + hour}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {medicines && medicines.length != 0 && medicines.map((medicine, i) =>
                            <div key={i} className="wrap-medicines-list">
                                <div>
                                    <img src={`https://localhost:44378/api/Images/${medicine.medicineImage}`}
                                        alt={medicine.medicineName} />
                                    <p>{medicine.medicineName}</p>
                                </div>
                                <Button type="button" onClick={() => removeMedicine(medicine)}>הסר תרופה זו</Button>
                            </div>)}
                        {(!medicines || medicines.length == 0) && <p>לא קיימות תרופות ללקיחה בשעה זו :)</p>}
                        <laebl style={{ color: "#d75e5e" }}>להוספת תרופה בחר ב<strong style={{ cursor: "pointer" }} onClick={() => navigate("/medicines")}>דף התרופות</strong></laebl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar dir="rtl" open={openSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleSnackClose} severity={resultForm.severity} sx={{ width: '100%' }}>
                    {resultForm.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DayInDiary;