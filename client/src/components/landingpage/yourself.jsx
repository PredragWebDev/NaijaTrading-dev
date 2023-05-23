import { Grid, Typography } from "@mui/material";
import "./yourself.css";

export const Yourself = (props) => {
  return (
    <Grid container className="yourself"> 
      <Grid container className="mainboard">
        <Grid item md={7} xs={12} className="txt">
          <Typography variant="h2" className="text1">
            You have the option to trade independently or engage in competition with others.
          </Typography>
          <Typography variant="h4" className="text2">
            You can choose to hone your trading and investment skills individually, or you can participate in a game with numerous like-minded and knowledgeable investors to compete for the top position.
          </Typography>
        </Grid>
        <Grid container md={5} className="img" alignContent={"center"} alignItems={"center"}>
          <Grid item md={12} xs={12} textAlign={"center"}>
            <img src="./img/yourself.svg" alt="" width = "80%"/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // <div className='yourself'>
    //   <div className='mainboard'>
        
    //     <div className='txt'>
    //       <div className="text1">You have the option to trade independently or engage in competition with others.</div>
    //       <div className="text2">You can choose to hone your trading and investment skills individually, or you can participate in a game with numerous like-minded and knowledgeable investors to compete for the top position.
    //       </div>
    //     </div>
    //     <div className='img'>
    //       <img src="./img/yourself.svg" alt="" className="image"/>
    //     </div>
    //   </div>
      
    // </div>
  )
}
