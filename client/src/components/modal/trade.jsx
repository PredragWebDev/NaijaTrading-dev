import "./trade.css";
import { useState } from "react";

import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {Trade_child}  from "./trade_child";

export const Trade = React.forwardRef((props, ref) => {
    
    const [open, setOpen] = useState(false);
    const [curIndex, setIndex] = useState(0);
    const searchOptions = props.data.Symbol.map((item) => item.Crypto_name)

    const openChild_Modal = (state, index) => {
        setOpen(state);
        setIndex(index);
        console.log(props.data.Symbol[index]);
    };

    const handleClickSearchBar = (event, value) => {
        setIndex(searchOptions.indexOf(value));
        setOpen(true);
    }

    return (
        <div className="trade-panel">
            <div className="search-bar">
                <div className="close-btn">
                    <IconButton onClick={() =>props.tradeModal(false)}>
                        <CloseIcon style={{width:'24px', height:'24px', color:'white'}}/>
                    </IconButton>
                </div>
                <div className="symbol-search-bar">
                    <span>Symbol</span>
                    <div className="search-component">
                        <div className='input-wrap'>

                            <Autocomplete
                                id="CryptoSymbolSearch"
                                inputProps = {{style:{color:'white'}}}
                                onChange={handleClickSearchBar}
                                options={searchOptions}
                                renderInput={(params) => <TextField inputProps={{style:{color:'white'}}} variant="standard" fullWidth {...params} />}
                                style={{width:'100%', fontSize:'20px'}}
                                sx={{color:'white'}}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-10">
                <div>
                    <ListSubheader sx={{ bgcolor: '#313131', fontSize:'15px', color:'white' }}>
                    POPULAR CRYPTOS
                    </ListSubheader>
                    {props.data.Symbol.length > 0 && props.data.Symbol.map((item, index) => (
                        <>
                            <ListItem button key={index} onClick={ () => openChild_Modal(true,index)}>
                                <ListItemAvatar>
                                <Avatar style={{width:'60px', height:'60px'}} alt="Profile Picture" src={item.img_url} />
                                </ListItemAvatar>
                                <ListItemText primary={<Typography style={{fontSize: '20px'}}> {item.Crypto_name}</Typography>} secondary={<Typography style={{fontSize:'15px', color: 'white'}}>{item.Crypto_Symbol}</Typography>} />
                                <ListItemText style={{textAlign:'right'}} primary={<Typography style={{fontSize: '20px'}}> ${item.Crypto_name_Price}</Typography>} secondary={<Typography style={{fontSize:'15px'}} className={`${((item.Crypto_name_Price-item.Crypto_Price_24H)/item.Crypto_name_Price*100) === 0 ? ('class-white'): ((item.Crypto_name_Price-item.Crypto_Price_24H)/item.Crypto_name_Price*100) < 0 ? ('class-red'):('class-green')}`}>{((item.Crypto_name_Price-item.Crypto_Price_24H)/item.Crypto_name_Price*100).toLocaleString()}%</Typography>} />                            </ListItem>
                        </>
                    ))}
                        <Modal
                        ref = {ref}
                        open={open}
                        style={{position: 'fixed', top:'50px', alignItems:'center', justifyContent:'center'}}
                        onClose={() =>openChild_Modal(false)}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                        >
                            <Trade_child  tradeModal = {props.tradeModal} openChild_Modal = {openChild_Modal} portfolio = {props.portfolio} username = {props.username} item = {props.data.Symbol[curIndex]} account_value = {props.acc_balance} cash = {props.cash} action = {"buy"} mode = {props.mode}/>
                        </Modal>
                </div>
            </div>
        </div>
    )
})