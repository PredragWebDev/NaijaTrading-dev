import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import { IconButton } from "@mui/material";
import { Trade } from './modal/trade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import initialData from "../data/data.json";
import Holding_table from './holding_table';
import Chart from 'react-apexcharts';
import {makeStyles} from '@mui/styles';
import "./index.css";

function MyButton(props) {
    const buttonstyle = {
        width:"300px",
        height:"40px"
    }
}
export const Trade_Panel = (props) => {

    const username = props.username
    
    const [open, setOpen] = useState(false);
    const effectRan = useRef(true);
    const [acc_balance, setBalance] = useState(0)
    const [cash, setCash] = useState(0)
    const [initial_data, setInitailData] = useState(initialData)
    const [portfolio, setPortfolio] = useState({})
    const [chartData, setChartData] = useState({})
    const [chartDates, setChartDates] = useState({})
    const [percent, setPercent] = useState(0)
    const [changeVal, setChangVal] = useState(0)
    const [cryproPric24Hago, setCryptoPrice24Hago] = useState([])
    const [chartX, setChartX] = useState([])
    const [chartY, setChartY] = useState([])

    const [loading, setLoading] = useState(false);

    let days = 0
    let symbols = []



    const tradeModal = (state) => {  
        setCash(cash)
        setOpen(state);
    };
    const get_dateRange = (range) => {
        switch (range) {
            case "1w":
                days = 7
                break;
            case "1M":
                days = 31
                break;
            case "3M":
                days = 90
                break;
            case "6M":
                days = 180
                break;
            case "1Y":
                days = 365
                break;
            default:
                days = 7
                break;
        }

        let tempChartY = [], tempChartX = []
        let temp = get_YMD(chartDates[0])

        let tempData = chartData[0], tempCount = 0
        let tempIndex = 0
        let tempDate
        if (chartDates.length > 1) {
            for (var i = 1 ; i < chartDates.length; i ++) {
                
                tempDate = get_YMD(chartDates[i])
 
                if(temp === tempDate) {
                    if (tempData < chartData[i]) {
                        tempData = chartData[i]
                    }
                    
                    tempCount ++
                }
                else {
                    tempChartY[tempIndex] = tempData
                    tempChartX[tempIndex] = temp

                    temp = tempDate
                    tempData = chartData[i]

                    tempIndex ++
                    tempCount = 0
                }
            }
        }

        tempChartY[tempIndex] = tempData
        tempChartX[tempIndex] = temp

        let tempX = [], tempY = []

        if(tempChartX.length < days) {
            tempX = tempChartX;
            tempY = tempChartY;
        } else {
            for (i = 0 ; i< days; i++) {            
                if (tempChartX[tempChartX.length-days+i] !== undefined) {
                    tempX.push(tempChartX[tempChartX.length-days+i]);
                    tempY.push(tempChartY[tempChartY.length-days+i]);
                }
            }
        }

        tempY.length>1 ? setChangVal(tempY[tempY.length-1] - tempY[tempY.length-2]): setChangVal(0)
        tempY.length>1 ? setPercent(parseFloat(tempY[tempY.length-1] - tempY[tempY.length-2])/tempY[tempY.length-1]): setPercent(0)        

        setChartX(tempX)
        setChartY(tempY)

    }

    const tempOption = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          stroke : {
            width:2
          },
          tooltip: {
            y: {
                formatter: function (value) {
                    return "$" + value.toLocaleString();
                }
            }
        },
        yaxis:{
            labels:{
                style: {
                    colors : '#FFFFFF',
                    fontSize:'15px'
                },
                formatter: function (value) {
                    return value/1000 + 'K';
                }
            }
        },
        xaxis: {
            // categories: ["4/23", "4/23", "4/23", "4/23", "4/23", "4/23", "4/23", "4/23", "4/23"]
            categories: chartX,
            tickAmount: 10,
            labels:{
                style: {
                    colors : '#FFFFFF',
                    fontSize:'15px'
                },
             
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0
            },
          }
        },
        series: [{
          name: username,
        //   data: [890303.123, 890303.213, 890303.42, 890303.213, 890303.12, 890303.6, 890303.234, 890303.1, 890303.125]
          data: chartY,
          color:'#FFC90E',
        }]
    }

    function get_YMD (fullDate) {
        let str_tempYMD

        const date = new Date(fullDate)

        str_tempYMD = (date.getMonth() + 1).toString() + "/" + date.getDate().toString()
        return str_tempYMD
    }
    useEffect(() => {
        
        let tempChartY = [], tempChartX = []
        let temp = get_YMD(chartDates[0])

        let tempData = chartData[0], tempCount = 0
        let tempIndex = 0
        let tempDate
        if (chartDates.length > 1) {
            for (var i = 1 ; i < chartDates.length; i ++) {
                
                tempDate = get_YMD(chartDates[i])
 
                if(temp === tempDate) {
                    if (tempData < chartData[i]) {
                        tempData = chartData[i]
                    }
                    
                    tempCount ++
                }
                else {
                    tempChartY[tempIndex] = tempData
                    tempChartX[tempIndex] = temp

                    temp = tempDate
                    tempData = chartData[i]

                    tempIndex ++
                    tempCount = 0
                }
            }
        }

        tempChartY[tempIndex] = tempData
        tempChartX[tempIndex] = temp

        let tempX = [], tempY = []

        if(tempChartX.length < 7) {
            tempX = tempChartX;
            tempY = tempChartY;
        } else {
            for (var i = 0 ; i< 7; i++) {            
                if (tempChartX[tempChartX.length-7+i] !== undefined) {
                    tempX.push(tempChartX[tempChartX.length-7+i]);
                    tempY.push(tempChartY[tempChartY.length-7+i]);
                }
            }
        }

        tempY.length>1 ? setChangVal(tempY[tempY.length-1] - tempY[tempY.length-2]): setChangVal(0)
        tempY.length>1 ? setPercent(parseFloat(tempY[tempY.length-1] - tempY[tempY.length-2])/tempY[tempY.length-1]): setPercent(0)        

        setChartX(tempX)
        setChartY(tempY)

    }, [chartData, chartDates])
  
    const get_Price = () => {
        axios({
            method: "post",
            url: 'http://localhost:5000/get_coin_price',
        })
        .then((response) => {
            setCryptoPrice24Hago(response.data['priceAgo'])
            symbols = response.data['symbol']

            for (let index = 0; index < symbols.length ; index ++) {
                try{
                    let item = {
                        "img_url": "https://cdn.xignite.com/crypto" + response.data["imgURL"][symbols[index]],
                        "Crypto_name":  response.data["symbolName"][index],
                        "Crypto_Symbol": symbols[index],
                        "Crypto_name_Price": response.data['price'][symbols[index]],
                        "Crypto_Price_24H" :response.data['priceAgo'][symbols[index]]
                    }
                   
                    initial_data.Symbol.push(item);
                }catch(e) {
                    console.log("symbol_error",e);
                }
                
            }

        })
        .catch((error) => {
            if (error.response) {
                alert("Server Error!!!")
                console.log("error~~~~~~~~~")
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });
    }

    const get_Portfolio = (mode) => {
        setLoading(true)
        axios({
            method:'post',
            url: 'http://localhost:5000/portfolio',
            data:{"username":username, "mode":mode},
        })
        .then((response) => {

            setBalance(response.data['account_balance']);
            setCash(response.data['cash']);
            setChartData(response.data['chartData']);
            setChartDates(response.data['chartDates']);

            console.log("accountBalance>>>>", response.data['account_balance'])
            console.log("cash>>>>>>>>>>>>", response.data['cash'])
            console.log("chatdata >>>>", response.data['chartData'])
            console.log("chartDate>>>>>", response.data['chartDates'])

            setPortfolio(response.data['portfolios']);

            setLoading(false)
            
        }).catch((error) => {
            if (error.response) {
                alert("Server Error!!!")
                console.log("porfolio error~~~~~~~~~")
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                setLoading(false)
            }
        })
    }

    useEffect(() => {

        if(effectRan.current === true){
            setInitailData(initialData);
        
            get_Price();
        
            get_Portfolio(props.mode);

            get_dateRange();
            
        };
          
        return () => (effectRan.current = false);
        
    }, [])

    return (
        <div className="mainpage-content">
            {loading ? (
                <Box sx={{ height:'100%', alignItems:'center', display: 'flex', flexDirection:'column', justifyContent:'center' }}>
                    <CircularProgress />
                    Loading...
                </Box>
            ) : (
                <div className="div-heigh-3">
                    <div className="overview">OVERVIEW</div>
                    
                    <div className="overview-show">
                        <div className="overview-content">
                            <div className="overview-item">
                                <div className="text-overline">
                                    account value
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
                                                <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>Displays the total current value of your portfolio, which is updated daily.</Typography>
                                            </Popover>
                                        </div>
                                        
                                    )}
                                    </PopupState>
                                </div>
                                <div className="text-h4 acc_val">
                                    ${acc_balance.toLocaleString()}
                                </div>
                            </div>

                            <div className="overview-item">
                                <div className="text-overline">
                                        24 hours change
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
                                                        <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>Your account's gains/losses over the past 24 hours.</Typography>
                                                    </Popover>
                                                </div>
                                                
                                            )}
                                        </PopupState>
                                </div>
                                <div id='changeVal' className={`hours_chance ${changeVal < 0 ? ('class-red'):('class-green')}`}>
                                    ${changeVal.toLocaleString()}<p style={{fontSize:'15px'}}>{`(${percent.toLocaleString()}%)`}</p>
                                </div>
                            </div>

                            <div className="overview-item">
                                <div className="text-overline">
                                    cash
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
                                                    <Typography style={{width:'240px', height:'98px', overflow:'auto', backgroundColor:'#121212', color:'white', fontSize:'15px'}} sx={{ p: 1 }}>Total amount of cash available for making trades.</Typography>
                                                </Popover>
                                            </div>
                                            
                                        )}
                                    </PopupState>                                   

                                </div>
                                <div className="text-h4 acc_val">
                                    ${cash.toLocaleString()}
                                </div>
                            </div>

                            <div className="overview-item popup-menu-container">
                                
                                <button onClick={() => tradeModal(true)} className='trade-button'>
                                    <AddCircleOutlineIcon style={{width:'20px', height:'20px', marginRight:'10px'}}/>
                                    TRADE
                                </button>

                                <Modal
                                    open={open}
                                    style={{position: 'fixed', top:'50px', alignItems:'center', justifyContent:'center'}}
                                    onClose={() =>tradeModal(false)}
                                    aria-labelledby="parent-modal-title"
                                    aria-describedby="parent-modal-description"
                                >
                                    <Trade  tradeModal = {tradeModal} portfolio = {get_Portfolio} username = {username} data = {initial_data} acc_balance = {acc_balance} cash = {cash} mode = {props.mode} />
                                </Modal>
                            </div>
                        </div>
                    </div>

                    <div className="overview">PERFORMANCE</div>
                    
                    <div className="performance-show">
                        <div className="performance-content">
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Button id='1w' style={{width:'20%', color:'white', fontSize:'15px'}} onClick={() => get_dateRange("1W")}>1W</Button>
                                <Button id='1M' style={{width:'20%', color:'white', fontSize:'15px'}} onClick={() => get_dateRange("1M")}>1M</Button>
                                <Button id='3M' style={{width:'20%', color:'white', fontSize:'15px'}} onClick={() => get_dateRange("3M")}>3M</Button>
                                <Button id='6M' style={{width:'20%', color:'white', fontSize:'15px'}} onClick={() => get_dateRange("6M")}>6M</Button>
                                <Button id='1Y' style={{width:'20%', color:'white', fontSize:'15px'}} onClick={() => get_dateRange("1Y")}>1Y</Button>
                            </div>

                            {/* <div id="chart"></div> */}
                            <Chart options={tempOption['options']} series = {tempOption['series']} type = 'line' width = {'100%'} height = {'300px'} />
                            {/* <Chart options={chartoption['options']} series = {chartoption['series']} type = 'line' width = {'100%'} height = {'300px'} /> */}

                        
                        </div>
                    </div>


                    <div className="overview">HOLDINGS</div>
                    
                    <div className="performance-show">
                        <Holding_table tradeModal = {tradeModal} portfolio = {portfolio} portfolio_fun = {get_Portfolio} username = {username} data = {initial_data} acc_balance = {acc_balance} cash = {cash} agoPrice = {cryproPric24Hago} />
                    </div>
                </div>
            )}

            
        </div>
    )
}