import React, { useEffect, useState } from 'react';

const HourInDay = (props) => {
    const [medicines, setMedicines] = useState();

    useEffect(() => {
        setMedicines(Object.values(props.dayInWeek.hours)[props.i]);
    }, [props.dayInWeek.hours, props.i]);

    const isMedicinesExist = Object.values(props.dayInWeek.hours)[props.i].length > 0;

    return (
        <div className={"wrap-hour" + (isMedicinesExist ? " exist" : "")} onClick={props.onClick}>
            <strong>{props.hour}</strong>
            <p className="wrap-medicines">
                {medicines && medicines.map((medicine, i) =>
                    <label key={i} className="medicine">{medicine.medicineName}</label>)}
            </p>
        </div>
    );
};

export default HourInDay;