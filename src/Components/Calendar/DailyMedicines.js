import React, { Fragment } from 'react';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
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
    const { medicinesList = [], timelineDetails = [] } = props;

    const generateHourList = () => {
        const hours = [];
        for (let i = 8; i <= 21; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    };

    // הוספת תרופה ליומן- לסדר ויזואלית 
    // להגביל עד 9 בשעת לקיחה
    // לבדוק באג בשבועות הבאים
    // לטפל במייל
    // לשכפל שבוע ??

    const groupedByTime = timelineDetails?.reduce((acc, obj) => {
        acc[obj.takingHour?.hours] = [...(acc[obj.takingHour?.hours] || []), obj];
        return acc;
    }, {});

    // console.log(props.date, 'medicine', medicine, 'group', groupedByTime);

    const getMedicineDetails = (hour) => {
        const medicine = groupedByTime[hour.replace(/:00$/, '')];
        console.log(props.date, 'medicine', medicine, 'hour', hour);
        return (
            // <VerticalTimelineElement
            //     className="vertical-timeline-element--work"
            //     contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            //     contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            //     date="2011 - present"
            //     iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            //     icon={<span>--</span>}
            // >
            //     <h3 className="vertical-timeline-element-title">{medicine.medicineName}</h3>
            //     <img src={`${medicine.medicineImage}`} />
            //     {/* <p>
            //         Creative Direction, User Experience, Visual Design, Project Management, Team Leading
            //     </p> */}
            // </VerticalTimelineElement>
            <TimelineItem key={hour}>
                <TimelineOppositeContent color="textSecondary">
                    {hour || 'אין שעה'}
                </TimelineOppositeContent>
                {/* { ( */}
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
