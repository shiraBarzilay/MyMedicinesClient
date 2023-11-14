import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addMedicineToUser } from '../store/actions/medicine';
import utils from '../utils';

export const Hour = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
];

export const Day = [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי',
    'שישי',
    'שבת'
];

const AddExistingMedicineToUser = (props) => {
    const [startDate, setSelectedStartDate] = useState(new Date());
    const [endDate, setSelectedEndDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [resultForm, setResultForm] = useState({ message: "", severity: "" });

    const handleDialogClose = () => {
        props.setOpenDialog(false);
        resetForm();
    };

    const handleSelectedStartDateChange = (event) => {
        setSelectedStartDate(event.target.value);
    };

    const handleSelectedEndDateChange = (event) => {
        setSelectedEndDate(event.target.value);
    };

    const handleSelectedHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleSnackClose = () => {
        setOpenSnackBar(false);
    };

    const resetForm = () => {
        setSelectedStartDate("");
        setSelectedHour("");
    };

    const addMedicineToUser = () => {
        if (startDate !== "" && selectedHour !== "" && props.selectedMedicine != null) {
            utils.addMedicineToUser(
                props.currentUser.userId,
                props.selectedMedicine.medicineId,
                selectedHour,
                startDate,
                endDate
            ).then(result => {
                if (result.data == true) {
                    props.addMedicineToUser({ user: props.currentUser, medicine: props.selectedMedicine, hour: selectedHour, day: startDate });
                    setResultForm({ message: "התרופה נוספה בהצלחה!", severity: "success" });
                    setOpenSnackBar(true);
                    resetForm();
                    handleDialogClose();
                }
                else {
                    setResultForm({ message: "קרתה תקלה בהוספת התרופה, נסה שוב מאוחר יותר.", severity: "error" });
                    setOpenSnackBar(true);
                }
            });
        }
    }

    return (
        <>
            <Dialog dir="rtl" open={props.openDialog} onClose={handleDialogClose}>
                <DialogTitle>הוספת תרופה ליומן</DialogTitle>
                <DialogContent>
                    <p>
                        הגדר שעה וימים בהם אתה צריך לקחת {props.selectedMedicine?.medicineName}.
                    </p>
                    {props.selectedMedicine && props.selectedMedicine.medicineImage && <img src={`https://localhost:44378/api/Images/${props.selectedMedicine.medicineImage}`} height={100} />}
                    <FormControl fullWidth>
                        <InputLabel>בחר שעת לקיחה</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={selectedHour}
                            label="בחר שעת לקיחה"
                            onChange={handleSelectedHourChange}
                        >
                            {Hour.map((option, i) => <MenuItem key={i} value={Hour.indexOf(option)}>{option}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel  className='date-label'>בחר תאריך התחלה</InputLabel>
                        {/*} <Select
                            labelId="demo-simple-select-label"
                            value={startDate}
                            label="בחר יום"
                            onChange={handleSelectedDayChange}
                        >
                            {Day.map((option, i) => <MenuItem key={i} value={Day.indexOf(option)}>{option}</MenuItem>)}
                        </Select> */}
                        <input type="date" value={startDate} className="date-input" name='startDate' placeholder="תאריך התחלה" onChange={handleSelectedStartDateChange} />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel className='date-label'>בחר תאריך סיום</InputLabel>
                        {/*} <Select
                            labelId="demo-simple-select-label"
                            value={startDate}
                            label="בחר יום"
                            onChange={handleSelectedDayChange}
                        >
                            {Day.map((option, i) => <MenuItem key={i} value={Day.indexOf(option)}>{option}</MenuItem>)}
                        </Select> */}
                        <input type="date" value={endDate} className="date-input" name='endDate' placeholder="תאריך סיום" onChange={handleSelectedEndDateChange} />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>ביטול</Button>
                    <Button onClick={addMedicineToUser}>הוסף תרופה ליומן</Button>
                </DialogActions>
            </Dialog>

            <Snackbar dir="rtl" open={openSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleSnackClose} severity={resultForm.severity} sx={{ width: '100%' }}>
                    {resultForm.message}
                </Alert>
            </Snackbar>
        </>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        addMedicineToUser: (obj) => dispatch(addMedicineToUser(obj))
    };
};
export default connect(null, mapDispatchToProps)(AddExistingMedicineToUser);