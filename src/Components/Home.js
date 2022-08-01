import "../ComponenetsStyle/Home.css";
export default function Home(){
    return(      
        <>
        <div className="textWrite">
            <b><p>התרופות שלך,</p></b>
           <b> <p> זה הדבר הראשון שלנו!</p></b>
        </div>
        <div className="detailInput">
    <input type="email" className="inp" id="inp1" placeholder="מייל"/>
    <input type="password" className="inp" placeholder="סיסמא"/>   
  </div>
 <input type="button" className="button" value="התחברות"/>
 
        </>
       
    )
}