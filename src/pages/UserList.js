import React, { useState, useEffect } from 'react'
import AdvanceTable from '../component/Table/AdvanceTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/slice/userSlice';
import { Box, Container, Stack} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

const UserList = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const getData = useSelector(state => state.UserReducer)
    const { loading, userData } = getData
    useEffect(() => {
        dispatch(fetchUserById())
    }, [])
    useEffect(() => {
        setData(userData?.users)
    }, [userData])
    useEffect(()=>{
        if(userData?.users?.length>0){
            const searchData = userData?.users.filter((item)=>{
                if(search===''){
                    return item;
                }
                else{
                    return (item.firstName.toLowerCase().includes(search))
                }
            })
            setData(searchData)
        }
    },[search])
    console.log("data--",data)
    const handleOnchange = (e) => {
        console.log("e",e.target.value)
        const { value } = e.target
        setSearch(value)
    }
    const logout=()=>{
        localStorage.clear()
        nevigate('/')
    }
    return (
        <Container sx={{bgcolor:"#EEEDEB"}}style={{minHeight:'100vh'}}>
            <Stack direction={'row'} justifyContent={'space-between'} pt="5vh">
                <Stack px='6%'>
                    <Box sx={{
                        color:'grey',
                        fontSize:{
                        lg:22,
                        md:17,
                        sm:13,
                        xm:10
                    },
                    fontWeight:600
                    }} component={'h3'} className='text-gray-600'>User</Box>
                    <Box component={'small'} sx={{fontSize:{
                        lg:15,
                        md:12,
                        sm:10,
                        xm:10
                    },
                    color:'grey',}} >Here are all the users for this project</Box>
                </Stack>
                <Stack className='flex flex-column'>
                    <Button variant="contained" color="primary" onClick={()=>logout()}>Logout</Button>
                    <Button variant='outlined' color="primary" style={{marginTop:'5px'}}> + Add new</Button>
                </Stack>
            </Stack>
            <AdvanceTable
                search={search}
                handleOnchange={handleOnchange}
                loading={loading} 
                data={data} 
                />
        </Container>
    )
}

export default UserList;