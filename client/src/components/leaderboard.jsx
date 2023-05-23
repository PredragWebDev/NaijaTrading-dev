import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveIcon from '@mui/icons-material/Remove';
import { Trade_child } from './modal/trade_child';
import axios from 'axios';
import "./index.css";

export default function StickyHeadTable(props) {

    const [userRanking, setUserRanking] = useState([])
    const [userRankingAroundMe, setAroundMe] = useState([])
    const [loading, setLoading] = useState(false);

    const columns = [
        { id: 'rank', label: 'Rank', minWidth: 200, align: 'left' },
        { id: 'user', label: 'User', minWidth: 300, align: 'left' },
        {
        id: 'account_value',
        label: 'Account Value',
        minWidth: 350,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
        }
    ];

    const [rows, setRows] = useState([
        {
        rank: "1",
        user: "",
        account_value: 0
        },

    ])

    const get_user_data = () => {
        setLoading(true)
        axios({
            method: "post",
            url: 'http://localhost:5000/game_userdata',
            data:{"username":props.username, "mode":props.mode},
        })
        .then((response) => {
            console.log("userRanking<<<<", response.data['userRanking'])
            console.log("aroundme<<<<<<<<", response.data['userRankingAroundMe'])

            setUserRanking(response.data['userRanking'])
            setAroundMe(response.data['userRankingAroundMe'])
            setLoading(false)
        })
        .catch((error) => {
            if (error.response) {
                alert("Server Error!!!")
                console.log("error~~~~~~~~~")
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                setLoading(false)
            }
        });
    }

    const register_user = () => {
        axios({
            method: "post",
            url: 'http://localhost:5000/game_user_register',
            data:{"username":props.username},
        })
        .then((response) => {

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

    React.useEffect(() => {
        register_user()
        get_user_data()
    }, [])

    return (
        <div>
            {loading ? (
                <Box sx={{ height:'100%', alignItems:'center', display: 'flex', flexDirection:'column', justifyContent:'center' }}>
                    <CircularProgress />
                    Loading...
                </Box>
            ) : (
                <>
                    <div className='leaderboard-label'>LEADERBOARD</div>
                    <Paper sx={{ width: '100%', overflow: 'auto', backgroundColor: '#313131', color: 'white' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                        key={column.id}
                                        align= {column.align}
                                        style={{ minWidth: column.minWidth, fontSize: '15px', backgroundColor:'#313131', color:'white', paddingLeft:'50px', paddingRight:'50px' }}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                    
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userRanking.map((user, index) => {
                                        return (
                                            <TableRow className={`${user.username === props.username ? 'class-yourself' : ''} tableRow tableSetting`} role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell className='leaderboardtableSetting-left'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <div >
                                                            {index + 1}
                                                        </div>

                                                        <div style={{ alignItems: 'center', display: 'flex' }} className={`${user.ranking === 0 ? 'class-white' : user.ranking < 0 ? ('class-red') : ('class-green')}`}>
                                                            {user.ranking === 0 ? <RemoveIcon fontSize='large'></RemoveIcon> : user.ranking < 0 ? <ArrowDownwardIcon fontSize='large'></ArrowDownwardIcon> : <ArrowUpwardIcon fontSize='large'></ArrowUpwardIcon>}
                                                        </div>   
                                                    </div>
                                                </TableCell>
                                                <TableCell className='leaderboardtableSetting-left'>
                                                {user.username}
                                                </TableCell>
                                                <TableCell className='leaderboardtableSetting-right'>
                                                {`$${user.account_value.toLocaleString()}`}
                                                </TableCell>
                                                
                                            </TableRow>
                                        );
                                    })}
                                    
                                </TableBody>
                                <TableHead className='leaderboardtable-near-hearder'>
                                    <TableRow>
                                        <span>RESULT NEAR YOUR RANK</span>
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                    {userRankingAroundMe.map((user, index) => {
                                        return (
                                            <TableRow className={`${user.username === props.username ? 'class-yourself' : ''} tableRow`} role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell className='leaderboardtableSetting-left'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <div >
                                                            {index + 1}
                                                        </div>

                                                        <div style={{ alignItems: 'center', display: 'flex' }} className={`${user.ranking === 0 ? 'class-white' : user.ranking < 0 ? ('class-red') : ('class-green')}`}>
                                                            {user.ranking === 0 ? <RemoveIcon fontSize='large'></RemoveIcon> : user.ranking < 0 ? <ArrowDownwardIcon fontSize='large'></ArrowDownwardIcon> : <ArrowUpwardIcon fontSize='large'></ArrowUpwardIcon>}
                                                        </div>   
                                                    </div>
                                                
                                                </TableCell>
                                                <TableCell className='leaderboardtableSetting-left'>
                                                {user.username}
                                                </TableCell>
                                                <TableCell className='leaderboardtableSetting-right'>
                                                {`$${user.account_value.toLocaleString()}`}
                                                </TableCell>
                                                
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </>
            )}
        </div>
    );
}