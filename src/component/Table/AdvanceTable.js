import { Button, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PopUp from '../popup/PopUp';
import { Box } from '@mui/system';
import styles from './table.module.css'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Input
} from '@material-ui/core';
import { VisibilityOff } from '@mui/icons-material';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  MuiDrawerPaperAnchorRight: {
    borderTopLeftRadius: '25px'
  }
});
const Table = (props) => {
  const { loading, data, search, handleOnchange } = props
  const [index, setIndex] = useState()
  const [popData, setPopData] = useState()
  const [page, setPage] = useState(1)
  const [right, setRight] = useState()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(data?.length / 5) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  const handleSidebar = (i) => {
    setRight("right")
    toggleDrawer("right", true)
    console.log("123", i)
    fetch(`https://dummyjson.com/users/${i}`).then(res => res.json()).then(result => { setPopData(result) })
    handleShow()
    setIndex(i)

  }

  return (
    <Container>
      <Stack direction='row' my='5vh'mx='25px' >
        <Box mt={'2vh'} bgcolor='white' >
        <FormControl variant="standard">
        <OutlinedInput
          id="input-with-icon-adornment"
          placeholder='Search name..'
          backgroundColor='red'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          type="text" name='search' value={search} onChange={(e) => handleOnchange(e)} 
          sx={{
            borderRadius:'25px',
            bgcolor:'#fff'
          }}
          autoFocus={false}
        />
        </FormControl>
          {/* <span class={styles.serch_icon}>
            <i className='fa fa-search '></i>
          </span> */}
          {/* <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-48 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..." type="text" name='search' value={search} onChange={(e) => handleOnchange(e)} /> */}
        </Box>
        <Stack direction={"row"}>
        <Box component={'span'} mt="20px" mx='10px' sx={{
          fontSize: {
            lg: 22,
            md: 14,
            sm: 12,
            xm: 10
          }
        }}>
          <FilterAltIcon />
          <Box sx={{
          fontSize: {
            lg: 16,
            md: 12,
            sm: 10,
            xm: 10
          }}}  component={'span'}>filter</Box>
        </Box>
        </Stack>
      </Stack>
      <Stack direction={'row'} justifyContent='space-around' alignItems={'center'} sx={{
        width: '100%',
        bgcolor: 'grey',
        height: '8vh',
      }}
        mx="2%"
        borderRadius={'5px'}
      >
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight: 500,
          wordWrap: 'break-word',
          width: '11rem',
        }}>IMAGES {" "}</Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight: 500,
          wordWrap: 'break-word',
          width: '11rem',
          paddingLeft:'60px'
        }} mx='60px'>NAME {" "}</Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight: 500,
          wordWrap: 'break-word',
          width: '11rem',
        }} className='pr-12'>GENDER {" "}</Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight: 500,
          wordWrap: 'break-word',
          width: '11rem',
          textAlign: 'end',
          paddingRight: "20px"
        }} >EMAIL {" "}<span style={{ color: 'GrayText' }}><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></span></Box>
      </Stack>
      {loading ? (
        <div className='mx-5'>
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
        </div>
      ) : (
        <>
          {
            data && data?.slice(page * 5 - 5, page * 5).map((item, i) => {
              return (
                <>
                  <Stack direction={'row'} justifyContent='space-around' alignItems={'center'} sx={{
                    width: '100%',
                    bgcolor: 'grey',
                    height: '8vh',
                    mt:'5px',
                    bgcolor:'#e6ffff',
                    borderLeft:'5px solid orange'
                  }}
                    mx="2%"
                    borderRadius={'5px'} onClick={() => handleSidebar(item.id)}>

                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
                    }}  style={{ width: "22%" }}>
                      <Avatar sx={{ bgcolor: "wheat" }} alt="Remy Sharp" src={item.image} />
                    </Box>
                    <Button sx={{
                      fontSize: {
                        lg: 14,
                        md: 11,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-wordk',
                      width: '11rem',
                      color: 'black',
                      textAlign:'center',
                    }} variant='text' onClick={toggleDrawer("right", true)}>{item.firstName}{" "}{item.lastName}</Button>
                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
                      justifyContent:'end',
                      textAlign:'center',
                    }} className='text-center truncate ' style={{ width: "22%" }}>{item.gender} </Box>
                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
                      textAlign:'end',
                    }} className='text-end truncate' style={{ width: "22%" }}>{item.email}</Box>
                  </Stack>
                </>
              )
            })


          }
        </>

      )
      }
      {/* Pagination */}
      {data && (
        <Stack flexDirection={'row'} justifyContent='space-between' mt='20px'>
          {/* Range information */}
          <p>
            Showing {Math.min((page - 1) * 5 + 1, data?.length)}-
            {Math.min(page * 5, data?.length)} of {data?.length}
          </p>

          {/* Pagination component */}
          <Box>
            <Pagination
              count={Math.ceil(data?.length / 5)}
              page={page}
              onChange={(event, value) => selectPageHandler(value)}
              variant='outlined'
              shape='rounded'
            />
          </Box>
        </Stack>
      )}

      <Drawer
        className={classes.MuiDrawerPaperAnchorRight}
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        PaperProps={{ elevation: 0, style: { borderTopLeftRadius: "25px" } }}
      >
        {/* {list("right")} */}
        <PopUp
          toggleDrawer={toggleDrawer}
          popData={popData}
        />
      </Drawer>
    </Container>
  )
}

export default Table