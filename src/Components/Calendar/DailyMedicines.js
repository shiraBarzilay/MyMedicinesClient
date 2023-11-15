import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

export const DailyMedicines = (props) => {
    const { timelineDetails = [] } = props;

    const generateHourList = () => {
        const hours = [];
        for (let i = 8; i <= 21; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    };

    // מקבלת מקומפוננט האב את התרופות שלוקחים ביום מסוים
    const groupedByTime = timelineDetails?.reduce((acc, obj) => {
        acc[obj.takingHour?.hours] = [...(acc[obj.takingHour?.hours] || []), obj];
        return acc;
    }, {});


    const getMedicineDetails = (hour) => {
        const medicine = groupedByTime[hour.replace(/:00$/, '')];
        return (
            <TimelineItem key={hour}>
                <TimelineOppositeContent color="textSecondary">
                    {hour || 'אין שעה'}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot
                        variant={medicine?.length ? "outlined" : undefined}
                        color={medicine?.length ? "primary" : undefined}
                    />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                // key={_medicineItem.id}
                >
                    {
                        medicine?.length
                            ? medicine.map((_medicineItem
                            ) => (
                                // <TimelineContent
                                //     key={_medicineItem.id}
                                // >
                                <div>{_medicineItem.medicineName}</div>
                                // </TimelineContent>
                            ))
                            : <TimelineContent />
                    }
                </TimelineContent>

            </TimelineItem>
        );
    }

    // const displayTimeline = () => {
    //     medicinesList.map((details) =>
    //         <Fragment key={details.id}>
    //             {getMedicineDetails(details)}
    //         </Fragment>
    //     )
    // };

    console.log('timelineDetails', timelineDetails);

    // const displayHorsTimeline=()=>{
    // };

    return <>
        {/* <div>{displayTimeline()}</div> */}
        {/* <VerticalTimeline>
            {timelineDetails.map && timelineDetails.map(
                (_medicineDetails) => getMedicineDetails(_medicineDetails)
            )}
        </VerticalTimeline> */}
        <div className='timeline-wrapper'>
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                    },
                }}
            >
                {generateHourList().map(
                    (hour) => getMedicineDetails(hour)
                )}
            </Timeline>
        </div>
        {/* {timelineDetails.map && timelineDetails.map(
            (_medicineDetails) => getMedicineDetails(_medicineDetails)
        )} */}
    </>;
};
