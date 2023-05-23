import { Grid, Typography } from "@mui/material";
import "./practice.css";

export const Practice = (props) => {
  return (

    <Grid container className="practice"> 
      <Grid container className="mainboard">
        <Grid item md={7} xs={12} className="txt">
          <Typography variant="h2" className="text1">
            Crypto trading with virtual money to gain experience.
          </Typography>
          <Typography variant="h4" className="text2">
            You don't need to make any deposit to start practicing trading. Use virtual money to enhance your understanding of the crypto market and learn how to use an online brokerage by using the Trade-Ed Simulator. This tool will give you the opportunity to build your confidence before investing your real money.
          </Typography>
        </Grid>
        <Grid container md={5} className="img" alignContent={"center"} alignItems={"center"}>
          <Grid item md={12} xs={12} textAlign={"center"}>
            <img src="./img/mobile.svg" alt="" width = "80%"/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // <div className='practice'>
    //   <div className='mainboard'>
        
    //     <div className='txt'>
    //       <div className="text1">Crypto trading with virtual money to gain experience.</div>
    //       <div className="text2">You don't need to make any deposit to start practicing trading. Use virtual money to enhance your understanding of the crypto market and learn how to use an online brokerage by using the Trade-Ed Simulator. This tool will give you the opportunity to build your confidence before investing your real money.
    //       </div>
    //     </div>
    //     <div className='img'>
    //       <img src="./img/mobile.svg" alt="" className="image"/>
    //     </div>
    //   </div>
    // </div>
  )
}
