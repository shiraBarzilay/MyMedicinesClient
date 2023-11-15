import { useState } from "react";
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek,
    getWeek,
    addWeeks,
    subWeeks
} from "date-fns";
import heLocale from 'date-fns/locale/he';
import { DailyMedicines } from "./DailyMedicines";
import { useSelector } from 'react-redux';

export const Calendar = ({ showDetailsHandle }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const changeMonthHandle = (btnType) => {
        if (btnType === "prev") {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
        if (btnType === "next") {
            setCurrentMonth(addMonths(currentMonth, 1));
        }
    };

    const changeWeekHandle = (btnType) => {
        //console.log("current week", currentWeek);
        if (btnType === "prev") {
            //console.log(subWeeks(currentMonth, 1));
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            //console.log(addWeeks(currentMonth, 1));
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };

    const onDateClickHandle = (day, dayStr) => {
        setSelectedDate(day);
        showDetailsHandle(dayStr);
    };
    //הצגת הימים בשבוע 
    const renderHeader = () => {
        const dateFormat = "MMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat, { locale: heLocale })}</span>
                </div>
                <div className="col col-end">
                    {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
                </div>
            </div>
        );
    };
    //מציג תאריכים בלוח שנה
    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat, { locale: heLocale })}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };

    const medicines = useSelector(store => store?.userReducer?.curretntUserMedicine || []);
    console.log('hdej', medicines);

    // const medicines = [
    //     {
    //         name: "akamol",
    //         startingDate: new Date(),
    //         lastUpdatedDate: addDays(new Date(), 2)
    //     },
    //     {
    //         name: "akamol2",
    //         startingDate: new Date(),
    //         lastUpdatedDate: addDays(new Date(), 4)
    //     }
    // ];

    const daysMedicinesDict = {};
    //   ארגון התרופות לפי ימים במילון
    // 2023-11-15-< [medicine1, medicine2, medicine3]
    const getMedicines = (week, startDate, endDate) => {
        // סינון התרופות שרלוונטיות לשבוע הזה שמוצג כעת
        const filteredMedicines = medicines.filter(
            ({ startingDate, lastUpdatedDate }) =>
                new Date(startingDate) <= endDate
                && new Date(lastUpdatedDate) >= startDate
        );
        console.log("filteredMedicines", filteredMedicines);
        // 01-07 הצגת שבוע 
        // 03-05 תרופה שלקחת      
        filteredMedicines.map((medicineDetails) => {
            console.log("details", medicineDetails);

            for (
                let _date = new Date(medicineDetails.startingDate);
                _date <= new Date(medicineDetails.lastUpdatedDate);
                _date = addDays(_date, 1)
                // מעבר על תאריך 03, 04, 05
                // מעבר על כל התאריכים שבהם יש לקחת את התרופה
            ) {
                //שמירת התרופה במילון
                daysMedicinesDict[_date?.toDateString()] = [
                    ...daysMedicinesDict[_date?.toDateString()] || [],
                    medicineDetails
                ];
            }
        });
    };


    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        // ארגון התרופות במילון לפי תאריך לקיחת התרופה
        getMedicines(null, startDate, endDate);
        console.log('daysMedicinesDict', daysMedicinesDict);
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <>
                        <div
                            className={`col cell ${isSameDay(day, new Date())
                                ? "today"
                                : isSameDay(day, selectedDate)
                                    ? "selected"
                                    : ""
                                }`}
                            key={day}
                            onClick={() => {
                                const dayStr = format(cloneDay, "ccc dd MMM yy");
                                onDateClickHandle(cloneDay, dayStr);
                            }}
                        >
                            <span className="number">{formattedDate}</span>
                            <span className="bg">{formattedDate}</span>
                            {/* משתמשים במילון תרופות שיצרנו- שולפים את כל התרופות שהתאריך שאנחנו מציגים מצביע עליו */}
                            <DailyMedicines date={day} timelineDetails={daysMedicinesDict[day.toDateString()]} />
                        </div>
                    </>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };
    const renderFooter = () => {
        return (
            <div className="header row flex-middle">
                <div className="col col-end" onClick={() => changeWeekHandle("prev")}>
                    <div className="icon">שבוע קודם</div>
                </div>
                <div className="col col-start">
                    <div className="icon" onClick={() => changeWeekHandle("next")}>
                        שבוע הבא
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderFooter()}
        </div>
    );
};

/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
