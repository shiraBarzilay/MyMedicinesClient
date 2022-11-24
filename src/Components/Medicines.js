import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import MedicationLog from './MedicationLog';

export default function Medicines(){

  let navigate=useNavigate();




  const nav=()=>{
  navigate("/medicationLog");
  }

return(
    <>
<h1>התרופות הפופולאריות לבחירה:</h1>  ,  
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="src/assets/acamol_20_tablets.jpg"
        alt="green iguana"
        name="akamol"
        onClick={nav}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          אקמול
        </Typography>
        <Typography variant="body2" color="text.secondary">
       .למניעת כאבי ראש והורדת חום
        </Typography>
      </CardContent>
    </Card>
</>
)
    

    
}