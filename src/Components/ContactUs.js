import { Send, Telephone, TelephoneFill } from "react-bootstrap-icons";
import "../ComponenetsStyle/ContactUs.scss";

export default function ContactUs() {
  return (
    <div className="contacDetails">
      <h1>שלום לך!</h1>
      <p>לכל שאלה ובעיה 24/7 אנחנו זמינות בשבילכם לקוחותינו היקרים!
        <br />
        צור קשר דרך מספרי פלאפון:
        <br />
        <Telephone /> <strong>0533138343</strong> <br/>
        <Telephone /> <strong>0548462581</strong>
        <br />
        או דרך האיימיל שלנו:
        <br />
        <Send/> <strong>MyMedicines2022@gmail.com</strong>
      </p>
    </div>
  )
}