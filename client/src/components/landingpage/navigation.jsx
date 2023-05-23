import { Grid } from "@mui/material";
import "./navigation.css";

export const Navigation = (props) => {
  return (
   
      <Grid container>
        <Grid item xs={5} md={8} className="nav-bar">
          <h1>
            <img src="./img/logo.PNG" alt="" className="nav-logo"/>
            Trade-Ed
          </h1>
        </Grid>

        <Grid container item xs={7} md={4} justifyContent="flex-end" alignItems="center">
            <a href = "/signup" id="get_started_btn" className="getstared-btn">GET STARTED</a>
            <a href ="/login" id="login_btn" className="login-btn">LOG IN</a>
        </Grid>
        
      </Grid>

  )
}
