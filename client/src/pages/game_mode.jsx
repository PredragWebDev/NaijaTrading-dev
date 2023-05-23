import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState} from "react";
import { Trade_Panel } from '../components/trade_panel';
import LeaderBoard from '../components/leaderboard';
export const Game_Mode = (props) => {
    const [alignment, setAlignment] = useState('leader');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <div className="game_panel">
            <div className="game-nav">
                <div className="game_nav_item">
                    <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    style={{marginRight:"20px", marginLeft:"20px"}}
                    aria-label="Platform"
                    >
                        <ToggleButton value="leader" className='togglebutton'>LeaderBoard</ToggleButton>
                        <ToggleButton value="trade" className='togglebutton'>Trade</ToggleButton>

                    </ToggleButtonGroup> 
                </div>
            </div>
            <div>
                {alignment === "leader" ? (
                    <div className='game_nav_item'>
                        <LeaderBoard username = {props.username} mode = {props.mode}/>
                    </div>

                ) :(
                    <Trade_Panel username = {props.username} mode = {props.mode}/>
                )}
                
            </div>
        </div>

    )
}
