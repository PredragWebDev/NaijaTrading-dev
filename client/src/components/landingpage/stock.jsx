import "./stock.css";
import "./navigation.css";
import { Grid, Typography } from "@mui/material";
//import { red, green, blue } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "green",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export const Stock = (props) => {
  // const theme = useTheme();
  // const matches = useMediaQuery('(padding:10px)');
  return (
    <Grid container spacing={2} className="cryptomainboard">
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid container md={7} xs={12}>
          <Grid container rowSpacing={2} direction={"row"}>

              <Typography variant="h2" gutterBottom className="stock-txt">
                Crypto Market Simulator
              </Typography>
 
              <Typography variant="h5" gutterBottom className="trusted-txt">
                Chosen and relied upon by a vast number of users.
              </Typography>
 
              <Typography variant="h5" gutterBottom className="investopedia-txt">
                Joining and utilizing the Trade-Ed Crypto Market Simulator is completely free of charge.
              </Typography>
              <Grid container item justifyContent="flex-start" alignItems="center">
                <a href="/signup" id="get_started_btn_onBoard" className="getstared-btn">GET STARTED</a>{' '}
              </Grid>
          </Grid>
        </Grid>
        <Grid container md={5} className="com-img" alignContent={"center"}>
          <Grid item md={12} xs={12} textAlign={"center"}>
            <img src="./img/com-img.svg" alt="" width={"80%"}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    
    // <header id='header'>
    //   <div className='intro'>
    //     <div className='overlay'>
    //       <div className='overlay'>
    //         <div className=''>
    //           <h1 className="stock-txt">
    //             Crypto Market Simulator
    //             <span></span>
    //           </h1>
    //           <p className="trusted-txt">Chosen and relied upon by a vast number of users.</p>
    //           <p className="investopedia-txt">Joining and utilizing the Trade-Ed Crypto Market Simulator is completely free of charge.</p>
    //           <a href="/signup" id="get_started_btn" className="getstared-btn">GET STARTED</a>{' '}
    //         </div>
    //       </div>
          
    //       <div className="com-img">
    //         <img src="./img/com-img.svg" alt="" width={"100%"}/>
    //       </div>
            
    //     </div>
    //   </div>
    // </header>
  )
}
