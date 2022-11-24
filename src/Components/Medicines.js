import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Medicines(){
return(
    <>
<h1>התרופות הפופולאריות לבחירה:</h1>  ,  
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="src\assets\acamol_20_tablets.jpg"
        alt="green iguana"
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