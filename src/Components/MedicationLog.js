import { useEffect, useState } from "react";
import "../ComponenetsStyle/MedicationLog.scss";
import { Day, Hour } from "./AddExistingMedicineToUser";
import utils from "../utils";
import { useSelector } from "react-redux";
import DayInDiary from "./DayInDiary";
import { useNavigate } from "react-router-dom";

//יומן תרופות
export default function MedicationLog() {
  const [log, setLog] = useState([]);
  const currentUser = useSelector(store => store.userReducer.currentUser);

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
      for (let i = 0; i < medicines.length; i++) {
        _log[medicines[i].takingDay - 1].hours[medicines[i].takingHour.hours + ":00"].push(medicines[i]);
      }
    }
    setLog(() => (_log));
  }

  const getMedicinesToUser = async () => {
    if (currentUser != null) {
      let result = await utils.getMedicinesToUser(currentUser.userId);
      // await setMedicines(result.data);
      return result.data;
    }
  }

  const changeColor = () => {
    this.backgroundColor = "red"
  }

  return (
    <>
      {/* <table >
        <tr>
          <th>ראשון</th>
          <th>שני</th>
          <th>שלישי</th>
          <th>רביעי</th>
          <th>חמישי</th>
          <th>שישי</th>
        </tr>
        <tr>
          <button onClick={changeColor}>10:00</button>
          <td>10:00</td>
          <td>10:00</td>
          <td>10:00</td>
          <td>10:00</td>
          <td>10:00</td>
        </tr>
        <tr>
          <td>11:00</td>
          <td>11:00</td>
          <td>11:00</td>
          <td>11:00</td>
          <td>11:00</td>
          <td>11:00</td>
        </tr>
        <tr>
          <td>12:00</td>
          <td>12:00</td>
          <td>12:00</td>
          <td>12:00</td>
          <td>12:00</td>
          <td>12:00</td>
        </tr>
        <tr>
          <td>13:00</td>
          <td>13:00</td>
          <td>13:00</td>
          <td>13:00</td>
          <td>13:00</td>
          <td>13:00</td>
        </tr>
        <tr>
          <td>14:00</td>
          <td>14:00</td>
          <td>14:00</td>
          <td>14:00</td>
          <td>14:00</td>
          <td>14:00</td>
        </tr>
        <tr>
          <td>15:00</td>
          <td>15:00</td>
          <td>15:00</td>
          <td>15:00</td>
          <td>15:00</td>
          <td>15:00</td>
        </tr>
        <tr>
          <td>16:00</td>
          <td>16:00</td>
          <td>16:00</td>
          <td>16:00</td>
          <td>16:00</td>
          <td>16:00</td>
        </tr>
        <tr>
          <td>17:00</td>
          <td>17:00</td>
          <td>17:00</td>
          <td>17:00</td>
          <td>17:00</td>
          <td>17:00</td>
        </tr>
        <tr>
          <td>18:00</td>
          <td>18:00</td>
          <td>18:00</td>
          <td>18:00</td>
          <td>18:00</td>
          <td>18:00</td>
        </tr>
        <tr>
          <td>19:00</td>
          <td>19:00</td>
          <td>19:00</td>
          <td>19:00</td>
          <td>19:00</td>
          <td>19:00</td>
        </tr>
        <tr>
          <td>20:00</td>
          <td>20:00</td>
          <td>20:00</td>
          <td>20:00</td>
          <td>20:00</td>
          <td>20:00</td>
        </tr>
        <tr>
          <td>21:00</td>
          <td>21:00</td>
          <td>21:00</td>
          <td>21:00</td>
          <td>21:00</td>
          <td>21:00</td>
        </tr>
        <tr>
          <td>22:00</td>
          <td>22:00</td>
          <td>22:00</td>
          <td>22:00</td>
          <td>22:00</td>
          <td>22:00</td>
        </tr>
      </table> */}
      <div className="wrap-log">
        {log != null && log.length > 0 && log.map((dayInWeek, i) => <DayInDiary key={i} dayInWeek={dayInWeek} updateLog={createLog} />)}
        {/* {log != null && log.length > 0 && log.map((dayInWeek, i) => <p>yes</p>)} */}
      </div>
    </>
  )
}