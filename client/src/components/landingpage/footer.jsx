import { Grid, Typography } from "@mui/material";
import "./footer.css";

export const Footer = () => {
    return (

        <Grid container className="footer">
            <Grid item className="footer">
                <Typography variant="h4" color={"white"}>
                    &copy; 2023, Trade-Ed
                </Typography>
            </Grid>
        </Grid>
        // <div id='footer'>
        //     <div className='footer'>
        //         <p>
        //             &copy; 2023, Trade-Ed
        //         </p>
        //     </div>
        // </div>
    )
}