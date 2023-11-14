import { useEffect, useState } from "react";
import "../ComponenetsStyle/MedicationLog.scss";
import { Day, Hour } from "./AddExistingMedicineToUser";
import utils from "../utils";
import { useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserMedicines } from '../store/actions/user';
import { Calendar } from "./Calendar";

//יומן תרופות
 function MedicationLog(props) {
  const [log, setLog] = useState([]);
  const currentUser = useSelector(store => store.userReducer.currentUser);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert("יש להתחבר לאתר")
      navigate("/home");
    }
    createLog();
  }, []);

  const createLog = async () => {
    let _log = [];
    for (let i = 0; i < Day.length; i++) {
      let hours = [];
      for (let j = 0; j < Hour.length; j++) {
        hours[Hour[j]] = [];
      }
      _log.push({ day: Day[i], hours });
    }
    console.log(_log);

    let medicines = await getMedicinesToUser();

    if (_log.length > 0) {
      for (let i = 0; i < medicines?.length; i++) {
        const { startingDate, lastUpdatedDate } = medicines[i] || {};
        const days = Array.from({ length: (lastUpdatedDate - startingDate) / (24 * 60 * 60 * 1000) + 1 }, (_, index) => new Date(startingDate.getTime() + index * 24 * 60 * 60 * 1000))
          .map(date => date.getDay());
        days.forEach(element => {
          _log[element].hours[medicines[i].takingHour.hours + ":00"].push(medicines[i]);
        });
      }
    }
    setLog(() => (_log));
  }

  const getMedicinesToUser = async () => {
    if (currentUser != null) {
      let result = await utils.getMedicinesToUser(currentUser.userId);
      // Save in redux
      props._setUserMedicines(result.data);
      return result.data;
    }
  }

  const changeColor = () => {
    this.backgroundColor = "red"
  }

  return (
    <div className="wrap-log">
      {/* {log != null && log.length > 0 && log.map((dayInWeek, i) =>
          <DayInDiary key={i} dayInWeek={dayInWeek} updateLog={createLog} offset={0} />)}
        {log != null && log.length > 0 && log.map((dayInWeek, i) => <p>yes</p>)} */}
      <Calendar showDetailsHandle={showDetailsHandle} />
      <br />
      {/* {showDetails && <Details data={data} />} */}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      _setUserMedicines: (medicines) => dispatch(setUserMedicines(medicines))
  };
};
export default connect(null, mapDispatchToProps)(MedicationLog);