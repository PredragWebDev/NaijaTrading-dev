
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState} from "react";
import { useParams } from 'react-router-dom';
import { Game_Mode } from './game_mode';
import { Trade_Panel } from '../components/trade_panel';
import {styled} from '@mui/material';
import Paper from '@mui/material/Paper';
import './index.css';
import { Box, Grid, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#212121',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
  }));

export const MainPage = () => {

    const params = useParams()
    const {username} = params;

    const [alignment, setAlignment] = useState('normal');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    

    return (
        <div style={{minHeight:'100%'}} className= "tradingboard">
                 
           <div className="top-nav">
                <div className="container-nav">
                    <div className="logo-image">
                        <h1>
                            {/* <img src="/img/logo.PNG" alt="" className="nav-logo"/> */}
                            Trade-Ed
                        </h1>
                        <div className='togglebutton_group'>
                            <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            style={{marginRight:"20px", with:'100px', border:"1px solid white"}}
                            aria-label="Platform"
                            >
                                <ToggleButton value="game" className='togglebutton'>GAME</ToggleButton>
                                <ToggleButton value="normal" className='togglebutton'>NORMAL</ToggleButton>

                            </ToggleButtonGroup> 
                            <a href='/' id="get_started_btn" className="logout-btn">Log out</a>

                        </div>
                    </div>
                </div>
            </div>

            <div className="split-line">
            </div>
            { alignment === "normal" ? (
                <Trade_Panel username = {username} mode = "normal"/> 
            ) : (
                <Game_Mode username = {username} mode = "game"/>
            )}
            

            <div className="mainpage-footer">

            </div>
        
        </div>
  
    )
}