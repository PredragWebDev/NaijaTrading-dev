import { Grid, Typography } from "@mui/material";
import "./trade.css";

export const Trade = (props) => {
  return (
    <Grid container spacing={2} className="trade">
      <Grid container className="mainboard">
        <Grid container md={5} className="img" justifyContent={"center"} alignItems={"center"}>
          <Grid item md={12} xs={12}>
            <img src="./img/trade.svg" alt="" width={"80%"}/>
          </Grid>
        </Grid>
        <Grid container md={7} xs={12} className="txt">
          <Typography variant="h2" className="text1">
            Diversify your portfolio with a broad selection of Cryptos available for trading.
          </Typography>
          <Typography variant="h4" className="text2">
            Whether you're a novice investor or seeking to refine your knowledge of advanced trading techniques, the Trade-Ed Simulator caters to your needs. With a selection of over 20 cryptocurrencies available for practice trading and investment, there's an opportunity for everyone.
          </Typography>
          
        </Grid>
      </Grid>
    </Grid>
    // <div className='trade'>
    //   <div className='mainboard'>
        
    //     <div className='img'>
    //       <img src="./img/trade.svg" alt="" className="image"/>
    //     </div>

    //     <div className='txt'>
    //       <div className="text1">Diversify your portfolio with a broad selection of Cryptos available for trading.</div>
    //       <div className="text2">Whether you're a novice investor or seeking to refine your knowledge of advanced trading techniques, the Trade-Ed Simulator caters to your needs. With a selection of over 20 cryptocurrencies available for practice trading and investment, there's an opportunity for everyone.
    //       </div>
    //     </div>
        
    //   </div>
      
    // </div>
  )
}
