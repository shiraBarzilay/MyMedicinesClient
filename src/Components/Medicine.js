import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import '../ComponenetsStyle/Medicine.scss';

const Medicine = (props) => {
    // תרופה בודדת
    // טיפול בבחירת תרופה בלחיצה
    return (
        <Card className={"medicine-card " + (props.selected == true ? "selected-card" : "")} sx={{ maxWidth: 230 }} onClick={props.onClick}>
            <CardMedia
                component="img"
                height="140"
                image={`https://localhost:44378/api/Images/${props.medicine.medicineImage}`}
                alt={props.medicine.medicineName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.medicine.medicineName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.medicine.medicineDescription}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Medicine;