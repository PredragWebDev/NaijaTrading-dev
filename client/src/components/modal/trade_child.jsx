import "./trade.css";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from "axios";

import "./trade.css";

export const Trade_child = (props) => {

    const [action, setAction] = useState(props.action);
    const [buyin, setBuyIn] = useState("USD");
    const [orderType, setOrderType] = useState("Market");
    const [duration, setDuration] = useState(24);
    const [amount, setAmount] = useState(10);
    const [amountLabel, setLabel] = useState("Amount");
    const [error, setError] = useState("");
    const [qty, setQty] =  useState(0.5);


    const buyInChange = (value) => {
        setBuyIn(value)
        if(value === "USD"){
            setLabel("Amount")
            setAmount(10)
        }
        else {
            setLabel("Quantity")
            setAmount(0)
        }
    }

    const changeAmount = (value) => {
        setAmount(value)
        if(amountLabel === "Amount"){
            if(value<10){
                setError("Cannot trade less than $10")
            }
            else setError("")
        }
        
    }

    const onTrade = (e)=> {
        e.preventDefault()

        console.log("action>>>", action)
        const new_qty = buyin === "USD" ? parseFloat(amount/props.item.Crypto_name_Price) : amount;
        setQty(new_qty)

        if(buyin !== "USD") {
            setAmount(qty*props.item.Crypto_name_Price)
        }
        
        console.log('new_qty :>> ', new_qty);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/trade`,
            data:{"username":props.username, "action":action, "qty":new_qty, "symbol":props.item.Crypto_Symbol, "mode":props.mode},
          })
          .then((response) => {
            console.log("trade>>>>>>>>>>>>>>",response.data)
            if (response.data["state"]) {
                props.portfolio(props.mode)
                props.tradeModal()
            }
            else {
                alert(response.data['error'])
            }
            
          }).catch((error) => {
            if (error.response) {
                alert("Server error!")
                console.log("error~~~~~~~~~")
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
              }
        })
    }
    
    return (
        <div className="trade-panel">
            <div className="search-bar">
                <div className="close-btn">
                    
                    <IconButton onClick={() =>props.tradeModal(false, 0)}>
                        <CloseIcon style={{width:'24px', height:'24px', color:'white'}}/>
                    </IconButton>
                </div>
                <div>
                    <Button style={{color:'white', fontSize:'15px'}} onClick={() =>props.openChild_Modal(false)}>
                        {"< BACK"}
                    </Button>
                </div>
            </div>

            <div className="p-10">
                <div>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar className="trade-child-crypto-avatar" alt="Profile Picture" src={props.item.img_url} />
                        </ListItemAvatar>
                        <ListItemText primary={<Typography className="trade-child-crypto-description-primary"> {props.item.Crypto_name}</Typography>} secondary={<Typography className="trade-child-crypto-description-secondary">{props.item.Crypto_Symbol}</Typography>} />
                        <ListItemText style={{textAlign:'right'}} primary={<Typography style={{fontSize: '20px'}}> ${props.item.Crypto_name_Price}</Typography>} secondary={<Typography style={{color:'white'}}>{((props.item.Crypto_name_Price-props.item.Crypto_Price_24H)/props.item.Crypto_name_Price*100).toLocaleString()}%</Typography>} />
                        
                    </ListItem>
                </div>

                <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'16px', paddingRight:'16px'}}>
                    <div>
                        <Typography style={{letterSpacing:'1px', fontWeight:'bold'}}>
                            ACCOUNT VALUE
                        </Typography>
                        <Typography style={{fontSize:'20px'}}>
                            ${props.account_value.toLocaleString()}
                        </Typography>
                    </div>

                    <div>
                        <Typography style={{letterSpacing:'1px', fontWeight:'bold'}}>
                            CASH
                        </Typography>
                        <Typography style={{fontSize:'20px'}}>
                            ${props.cash.toLocaleString()}
                        </Typography>
                    </div>
                </div>

                <form onSubmit={onTrade}>
                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px'}}>
                        
                        <div style={{display:'flex'}}>
                            Action
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                        <IconButton style={{width:'20px', height:'20px', marginLeft:'4px'}} {...bindTrigger(popupState)}>
                                            <InfoIcon style={{color:'white', width: '20px', height:'20px'}}/>
                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            }}
                                        >
                                            <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>Buy/Sell allow you to add/remove cryptos from your portfolio.</Typography>
                                        </Popover>
                                    </div>
                                    
                                )}
                            </PopupState>        
                        </div>
                    
                        <FormControl style={{marginTop:'10px', color:'white', border:'1px bold white'}} fullWidth>
                            <Select
                            id="action"
                            defaultValue={action}
                            onChange={(e) => setAction(e.target.value)}
                            required
                            sx={{fontSize:'20px', color:'white', border:'1px solid white'}}
                            >.
                                <MenuItem style={{fontSize:'20px'}} value={"buy"}>Buy</MenuItem>
                                <MenuItem style={{fontSize:'20px'}} value={"sell"}>Sell</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px'}}>
                        
                        <div style={{display:'flex'}}>
                            Buy In
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                        <IconButton style={{width:'20px', height:'20px', marginLeft:'4px'}} {...bindTrigger(popupState)}>
                                            <InfoIcon style={{color:'white', width: '20px', height:'20px'}}/>
                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            }}
                                        >
                                            <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>You can purchase crypto either in dollar amount or quantity. Fractional trades.</Typography>
                                        </Popover>
                                    </div>
                                    
                                )}
                            </PopupState>        
                        </div>
                    
                        <FormControl style={{marginTop:'10px', color:'white', border:'1px bold white'}} fullWidth>
                            <Select
                                id="buyin"
                                value={buyin}
                                onChange={(e) => buyInChange(e.target.value)}
                                style={{fontSize:'20px', color:'white', border:'1px solid white'}}
                                required
                            >
                                <MenuItem style={{fontSize:'20px'}} value={"USD"}>$USD</MenuItem>
                                <MenuItem style={{fontSize:'20px'}} value={"Quantity"}>Quantity</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px'}}>
                        
                        <div style={{display:'flex'}}>
                            {amountLabel}
                        </div>
                        <FormControl style={{width:'100%'}} variant="outlined">
                            <TextField
                                id="amount"
                                onChange={(e)=> changeAmount(e.target.value)}
                                required
                                type="number"
                                value={amount}
                                InputProps={{
                                    style:{width:'100%', border:'1px solid white', color:'white'},
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon style={{color:'white'}} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />  
                        </FormControl>

                        <h1 style={{color:'red', fontSize:'15px'}}>{error}</h1>
                       
                    </div>

                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px'}}>
                        
                        <div style={{display:'flex'}}>
                            Order Type
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                        <IconButton style={{width:'20px', height:'20px', marginLeft:'4px'}} {...bindTrigger(popupState)}>
                                            <InfoIcon style={{color:'white', width: '20px', height:'20px'}}/>
                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            }}
                                        >
                                            <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>
                                                How long the trade is open for. Most applicable to limit orders.   
                                                <Button style={{fontSize:'14px', color:'grey', display:'flex', justifyContent:'right'}} href="https://www.investopedia.com/terms/d/dayorder.asp">LEARN MORE</Button>
                                            </Typography>
                                        </Popover>
                                    </div>
                                    
                                )}
                            </PopupState>        
                        </div>
                    
                        <FormControl style={{marginTop:'10px', color:'white', border:'1px solid white'}} fullWidth>
                            <Select
                                id="ordertype"
                                required
                                value={orderType}
                                onChange={(e) => setOrderType(e.target.value)}
                                style={{fontSize:'20px', color:'white'}}
                            >
                                <MenuItem style={{fontSize:'20px'}} value={"Market"}>Market</MenuItem>
                                <MenuItem style={{fontSize:'20px'}} value={"Limit"}>Limit</MenuItem>
                                <MenuItem style={{fontSize:'20px'}} value={"StopLimit"}>Stop Limit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px'}}>
                        
                        <div style={{display:'flex'}}>
                            Duration
                        </div>
                    
                        <FormControl style={{marginTop:'10px', color:'white', border:'1px solid white'}} fullWidth>
                            <Select
                                id="duration"
                                required
                                value={duration}
                                disabled
                                onChange={(e) => setDuration(e.target.value)}
                                style={{fontSize:'20px', color:'white'}}
                            >
                                <MenuItem style={{fontSize:'20px'}} value={24}>24 Hours</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{marginTop:'20px', paddingLeft:'16px', paddingRight:'16px', display:'flex', justifyContent:'space-between'}}>
                        <Button variant="outlined" style={{width:'48%', height:'48px', border:'1px solid white', color:'white', fontSize:'15px'}}>CLEAR</Button>
                        <Button type="submit" variant="outlined" style={{width:'48%', height:'48px', border:'1px solid white', color:'white', fontSize:'15px'}}>PREVIEW ORDER {">"}</Button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}