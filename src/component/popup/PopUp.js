import { Avatar, Box, Divider, Stack } from '@mui/material';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),

      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    list: {
      width: "450px",
    },
    fullList: {
      width: 'auto',
    },
  }),
);

const PopUp = ({ name, ...props }) => {
  const { anchor, toggleDrawer } = props
  const classes = useStyles();
  return (
    <>
      <Box
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Box sx={{ marginTop: '48px' }} >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={10} sx={{ xs: 1, sm: 2, margin: '12px' }}
          >
            <Box className='mx-2 text-slate-500 '><h4>User details</h4></Box>
            <Box><MoreVertIcon /></Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Box ml={'3%'}>
              <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' src={props.popData?.image} className={classes.large} />
            </Box>
            <Stack direction={{ xs: 'column', sm: 'column' }}
              justifyContent="center"
              alignItems="center">
              <Box sx={{
                color: '#00004d',
                fontSize: {
                  lg: 14,
                  md: 12,
                  sm: 10,
                  xs: 10
                },
              }} component={'strong'} >{props.popData?.firstName}{" "}{props.popData?.lastName}
              </Box>
              <Box component={'small'} sx={{
                color: 'GrayText',
                fontSize: {
                  lg: 15,
                  md: 12,
                  sm: 10,
                  xs: 10
                },
                fontWeight: 500
              }} mx='70px'> User Id :{" "}{props.popData?.id}
              </Box>
              <Box sx={{
                color: 'GrayText',
                width: '100%',
                fontSize: {
                  lg: 15,
                  md: 12,
                  sm: 10,
                  xs: 10
                },
                fontWeight: 500
              }} m='5%' className='bg-lime-700  rounded-full text-center text-white ' style={{ width: '100px' }}>Active
              </Box>
            </Stack>
          </Stack>
          <Divider component='hr' />
          <Box className='flex flex-row my-2'>
            <Box className='mx-3'>
              <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' src={props.popData?.image} className={classes.small} />
            </Box>
            <Box component={'small'} sx={{
              color: 'GrayText',
              width: '100%',
              fontSize: {
                lg: 15,
                md: 12,
                sm: 10,
                xs: 10
              },
              fontWeight: 500
            }} mx='2%' >Basic & Account details
            </Box>
          </Box>
          <Stack>
            <Box sx={{
              color: '#00004d',
              fontSize: {
                lg: 14,
                md: 12,
                sm: 10,
                xs: 10
              },
            }} component={'strong'} mx="30%" my='3%'
            > {props.popData?.firstName}
            </Box>
            <Box component={'small'} sx={{
              color: 'GrayText',
              fontSize: {
                lg: 15,
                md: 12,
                sm: 10,
                xs: 10
              },
              fontWeight: 500
            }} mx="30%"> firstName
            </Box>
            <Box sx={{
              color: '#00004d',
              fontSize: {
                lg: 14,
                md: 12,
                sm: 10,
                xs: 10
              },
            }} component={'strong'} mx="30%" my='3%'>{props.popData?.lastName}
            </Box>
            <Box component={'small'} sx={{
              color: 'GrayText',
              fontSize: {
                lg: 15,
                md: 12,
                sm: 10,
                xs: 10
              },
              fontWeight: 500
            }} mx="30%" my='3%'> lastName
            </Box>
          </Stack>
          <Divider component='hr' />
          <Stack
            direction="row"
            justifyContent='start'
            alignItems="center"
          // spacing={10}
          >
            <Box mx='8%'>
              <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' />
            </Box>
            <Box component={'small'} sx={{
              color: 'GrayText',
              fontSize: {
                lg: 15,
                md: 12,
                sm: 10,
                xs: 10
              },
              fontWeight: 500
            }}
            >User Data
            </Box>
          </Stack>
        </Box>
        <Stack>
          <Box
            component={'strong'} sx={{
              color: '#00004d',
              width: '100%',
              fontSize: {
                lg: 15,
                md: 12,
                sm: 10,
                xs: 10
              },
            }} mx='30%'
          >
            May 18,2020- 11.45pm
          </Box>
          <Box sx={{
            color: 'GrayText',
            fontSize: {
              lg: 14,
              md: 12,
              sm: 10,
              xs: 10
            },
          }} component={'strong'} mx='30%' my='3%' >
            Last login
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default PopUp