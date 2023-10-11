import React, { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import HourInDay from './HourInDay';
import utils from '../utils';

const DayInDiary = (props) => {
    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState("");
    const [medicines, setMedicines] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [resultForm, setResultForm] = useState({ message: "", severity: "" });

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
    }

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
                        {medicines && medicines.map((medicine, i) =>
                            <div key={i} className="wrap-medicines-list">
                                <div>
                                    <img src={`https://localhost:44378/api/Images/${medicine.medicineImage}`}
                                        alt={medicine.medicineName} />
                                    <p>{medicine.medicineName}</p>
                                </div>
                                <Button type="button" onClick={() => removeMedicine(medicine)}>הסר תרופה זו</Button>
                            </div>)}
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