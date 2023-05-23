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
import RemoveIcon from '@mui/icons-material/Remove';
import { Trade_child } from './modal/trade_child';
import { Trade } from './modal/trade';
import "./index.css";

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState([])
  const [action, setAction] = useState("")

  const onModal = (state, action, symbol) => {

    console.log("symbol>>>>", props.data.Symbol)

    setAction(action)

    props.data.Symbol.map((item, index) => {
      if(item.Crypto_Symbol === symbol){
        console.log("item>>>>", item)
        setItem(item)
      }
    })
    setOpen(state)
  }

  const columns = [
    { id: 'symbol', label: 'Symbol', minWidth: 170, align: 'left' },
    { id: 'description', label: 'Description', minWidth: 100, align: 'left' },
    {
      id: 'currentPrice',
      label: 'Current Price',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'change',
      label: '24 Hours Change',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'qty',
      label: 'QTY',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'totalValue',
      label: 'Total Value',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'gainOrloss',
      label: 'Total Gain/Loss',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },

  ];

  const [rows, setRows] = useState([
    {
      symbol: "",
      description: "",
      currentPrice: 0,
      change: 0,
      changepercent: 0,
      purchasePrice: 0,
      qty: 0,
      totalValue: 0,
      gainOrloss: 0,
      gainOrlosspercent: 0,
      id: 0
    },

  ])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const setRowData = () => {
    console.log("okok")
    if (props.portfolio.length > 0) {
      const newRows = props.portfolio.map((item, index) => ({
        symbol: item.symbol,
        currentPrice: item.current_price,
        description: "",
        change: (item.current_price - props.agoPrice[item.symbol]),
        changepercent: parseFloat((item.current_price - props.agoPrice[item.symbol]) / props.agoPrice[item.symbol]),
        purchasePrice: item.purchase_price,
        qty: item.qty,
        totalValue: item.current_price * item.qty,
        gainOrloss: (item.current_price - item.purchase_price) * item.qty,
        gainOrlosspercent: parseFloat((item.current_price - item.purchase_price) / item.purchase_price),
        id: index
      }));

      console.log("newrow>>>>", newRows)

      newRows.map((item) => {
        props.data.Symbol.map((init_data) => {
          if (init_data.Crypto_Symbol === item.symbol) {
            item.description = init_data.Crypto_name
          }
        })

      })
      setRows(newRows)

    }
  }

  React.useEffect(() => {
    setRowData();
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'auto', backgroundColor: '#313131', color: 'white' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='right'
                  style={{ minWidth: column.minWidth, fontSize: '15px' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align='center'
                style={{ fontSize: '15px' }}
              >
                {'Trade Action'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow className='tableRow' role="checkbox" tabIndex={-1} key={index}>
                    <TableCell className='tableCell-left'>
                      {row.symbol}
                    </TableCell>
                    <TableCell className='tableCell-left'>
                      {row.description}
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      {row.currentPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div className={`${row.change === 0 ? 'class-white' : row.change < 0 ? ('class-red') : ('class-green')}`}>
                          {row.change.toLocaleString()} <br></br>
                          {`(${row.changepercent.toLocaleString()}%)`}
                        </div>

                        <div style={{ alignItems: 'center', display: 'flex' }} className={`${row.change === 0 ? 'class-white' : row.change < 0 ? ('class-red') : ('class-green')}`}>
                          {row.change === 0 ? <RemoveIcon fontSize='large'></RemoveIcon> : row.change < 0 ? <ArrowDownwardIcon fontSize='large'></ArrowDownwardIcon> : <ArrowUpwardIcon fontSize='large'></ArrowUpwardIcon>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      {row.purchasePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      {row.qty.toLocaleString()}
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      {row.totalValue.toLocaleString()}
                    </TableCell>
                    <TableCell className='tableCell-right'>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div className={`${row.gainOrloss === 0 ? 'class-white' : row.gainOrloss < 0 ? ('class-red') : ('class-green')}`}>
                          {row.gainOrloss.toLocaleString()} <br />
                          {`(${row.gainOrlosspercent.toLocaleString()}%)`}
                        </div>

                        <div style={{ alignItems: 'center', display: 'flex' }} className={`${row.gainOrloss === 0 ? 'class-white' : row.gainOrloss < 0 ? ('class-red') : ('class-green')}`}>
                          {row.gainOrloss === 0 ? <RemoveIcon fontSize='large'></RemoveIcon> : row.gainOrloss < 0 ? <ArrowDownwardIcon fontSize='large'></ArrowDownwardIcon> : <ArrowUpwardIcon fontSize='large'></ArrowUpwardIcon>}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className='tableCell-left'>
                      <div style={{ display: 'grid', justifyContent: 'left', color: '#c5dcff', fontSize: '15px' }}>
                        <div style={{ display: 'flex' }}>
                          <AddCircleOutlineIcon fontSize='large' /> <span onClick={() => onModal(true, "buy", row.symbol)} style={{ fontSize: '15px', color: '#c5dcff' }}>Buy more</span> 
                          {/* <a onClick={() => onModal(true, "buy", row.symbol)} style={{ fontSize: '15px', color: '#c5dcff' }}>Buy more</a> */}
                        </div>
                        <div style={{ display: 'flex' }}>
                          <RemoveCircleOutlineIcon fontSize='large' /> <a onClick={() => onModal(true, "sell", row.symbol)} style={{ fontSize: '15px', color: '#c5dcff' }}>Sell</a>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        style={{ position: 'fixed', top: '50px', alignItems: 'center', justifyContent: 'center' }}
        onClose={() => onModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {/* <Trade tradeModal={onModal} portfolio={props.portfolio_fun} username={props.username} data={props.data} acc_balance={props.acc_balance} cash={props.cash} /> */}
        <Trade_child  tradeModal = {onModal} openChild_Modal = {onModal} portfolio = {props.portfolio_fun} username = {props.username} item = {item} account_value = {props.acc_balance} cash = {props.cash} action = {action}/>
      </Modal>

      <TablePagination
        classes={{
          caption: 'tablepagination-fontsize'
        }}
        style={{ fontSize: '20px', color: 'white' }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}