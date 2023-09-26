import "../ComponenetsStyle/AboutUs.scss"

export default function AboutUs() {
    return (
        <div className="aboutDetails">
            <img className="img" src={require("../assets/כפית_תמונת_הבית.jpg")} />
            <h2><b>שלום לקוחות יקרים,</b></h2>
            <p>כמה מילים על ארגון שלנו "My Medicines"<br/>
                ארגון זה הוקם בשנת 2022 ע"י שירה ברזילי ומרים אדוט,<br/>
                הארגון נועד לחסוך מכם, לקוחותינו, כאב ראש ולחץ.<br/>
                אתם צריכים להקיש את התרופות שהנכם צריכים לקחת במהלך השבוע.<br/>
                ואנחנו דואגות לשלוח לכם תזכורת דרך האימייל שליכם לקחת את התרופות.<br/>
                <strong>חשובה לנו הבריאות שלכם!</strong><br/>
                רפואה שלימה,<br/>
                מאחלות <strong>שירה ומרים:)</strong> 
            </p>
        </div>
    )
}