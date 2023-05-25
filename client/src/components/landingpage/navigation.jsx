import { Grid } from "@mui/material";
import "./navigation.css";
import { useNavigate } from 'react-router-dom';

export const Navigation = (props) => {
  let navigate = useNavigate();
  const login = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const signUp = (e) => {
    e.preventDefault()
    navigate('/signup')
  }
  return (
   
      <Grid container>
        <Grid item xs={7} md={8} className="nav-bar">
          <h1>
            <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="" className="nav-logo"/>
            Trade-Ed
          </h1>
        </Grid>

        <Grid container item xs={5} md={4} justifyContent="flex-end" alignItems="center">
            <a onClick={signUp} id="get_started_btn" className="getstared-btn hiden_button">GET STARTED</a>
            <a onClick={login} id="login_btn" className="login-btn">LOG IN</a>
        </Grid>
        
      </Grid>

  )
}
