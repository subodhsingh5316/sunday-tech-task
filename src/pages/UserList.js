import React, { useState, useEffect } from 'react'
import AdvanceTable from '../component/Table/AdvanceTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/slice/userSlice';
import { Box, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';

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
        <Box sx={{background:"#EEEDEB"}}style={{minHeight:'100vh'}}>
            <div className='flex flex-row justify-between p-12  h-24  '>
                <div>
                    <h3 className='text-gray-600'>User</h3>
                    <small>Here are all the users for this project</small>
                </div>
                <div className='flex flex-column'>
                    <Button variant='contained' onClick={()=>logout()}>Logout</Button>
                    <Button variant='outlined' style={{marginTop:'5px'}}> + Add new</Button>
                </div>
            </div>
            <AdvanceTable
                search={search}
                handleOnchange={handleOnchange}
                loading={loading} 
                data={data} 
                />
        </Box>
    )
}

export default UserList;