import { Button, Pagination, Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PopUp from '../popup/PopUp';
import { Box } from '@mui/system';
import styles from './table.module.css'


const Table = (props) => {
  const { loading, data, search, handleOnchange } = props
  const [index, setIndex] = useState()
  const [popData, setPopData] = useState()
  const [page, setPage] = useState(1)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    console.log("123", i)
    fetch(`https://dummyjson.com/users/${i}`).then(res => res.json()).then(result => { setPopData(result) })
    handleShow()
    setIndex(i)

  }

  return (
    <Box>
      <Box className={styles.serchbar}>
        <Box>
          <Box className="relative block">
            <span class={styles.serch_icon}>
              <i className='fa fa-search '></i>
            </span>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-48 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..." type="text" name='search' value={search} onChange={(e) => handleOnchange(e)} />
          </Box>
        </Box>
        <Box className='m-2'>
          <span><i className='fa fa-filter'></i></span>
          <span>filter</span>
        </Box>
      </Box>
      <Box className={styles.tableHead}>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight:500,
          wordWrap: 'break-word',
          width: '11rem',
        }}>IMAGES {" "}<span className='text-sm text-slate-600'><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></span></Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight:500,
          wordWrap: 'break-word',
          width: '11rem',
        }} className='pl-9'>NAME {" "}<span className='text-sm text-slate-600'><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></span></Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight:500,
          wordWrap: 'break-word',
          width: '11rem',
        }} className='pr-12'>GENDER {" "}<span className='text-sm text-slate-600'><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></span></Box>
        <Box sx={{
          fontSize: {
            lg: 17,
            md: 16,
            sm: 10,
            xs: 10
          },
          fontWeight:500,
          wordWrap: 'break-word',
          width: '11rem',
        }} >EMAIL {" "}<span className='text-sm text-slate-600'><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></span></Box>
      </Box>
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
                  <Box key={i} className={styles.tablerow} onClick={() => handleSidebar(item.id)}>
                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
                    }} className='flex flex-row' style={{ width: "22%" }}>
                      <Avatar sx={{ bgcolor: "wheat" }} alt="Remy Sharp" src={item.image} />
                    </Box>
                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
                    }} className='text-center truncate' style={{ width: "22%" }}>{item.firstName}{" "}{item.lastName}</Box>
                    <Box sx={{
                      fontSize: {
                        lg: 16,
                        md: 13,
                        sm: 12,
                        xs: 10
                      },
                      wordWrap: 'break-word',
                      width: '11rem',
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
                    }} className='text-end truncate' style={{ width: "22%" }}>{item.email}</Box>
                  </Box>
                </>
              )
            })


          }
          {
            show && (<PopUp placement={"end"} name={"end"} handleClose={handleClose} handleShow={handleShow} show={show} index={index} popData={popData} />)
          }
        </>

      )


      }
      {/* Pagination */}
      {data && (
        <div className='flex flex-row justify-between m-5 '>
          {/* Range information */}
          <p>
            Showing {Math.min((page - 1) * 5 + 1, data?.length)}-
            {Math.min(page * 5, data?.length)} of {data?.length}
          </p>

          {/* Pagination component */}
          <div>
            <Pagination
              count={Math.ceil(data?.length / 5)}
              page={page}
              onChange={(event, value) => selectPageHandler(value)}
              variant='outlined'
              shape='rounded'
            />
          </div>
        </div>
      )}


    </Box>
  )


}

export default Table





