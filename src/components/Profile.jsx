import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, TextField, Typography, Button, LinearProgress } from '@mui/material'
import noteContext from '../contexts/notes/noteContext';

const Profile = () => {
    const navigate = useNavigate();

    const { host } = useContext(noteContext)
    
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/')
        }else{
            const fetchData = async () => {
                setLoading(true)
                const res = await fetch(`${host}/api/auth/getuser`,{
                    method: 'GET',
                    headers: {
                        'Auth-Token': localStorage.getItem('token')
                    }
                })
                const json = await res.json()
                if(res.ok) {
                    console.log(json)
                    if(json._id) {
                        setUserDetails(json)
                    }
                }else{
                    console.log(json)
                }
                setLoading(false)
            }
            
            fetchData();
        }
    },[])

    const handleUpdate = () => {

    }

    // const sendEmail = async () => {
    //     const res = await fetch('http://bhavanshuddalwadi.ml/apis/send_email.php',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({email: 'bhavanshuddalwadi@gmail.com', 'subject': 'Checking', 'html': '<h1>Your OTP: 67182</h1>'})
    //     })
    //     const json = await res.json()
    //     if(res.ok) {
    //         console.log(json)
    //         if(json.success) {
    //             console.log('Success')
    //         }
    //     }else{
    //         console.log(json)
    //         console.log('Failed')
    //     }
    // }

    return (
        <div className='grid-login' style={{marginTop: 90}}>
            <div></div>
            <Card variant='outlined'>
                <div style={{height: 2}}>
                    {loading && <LinearProgress />}
                </div>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Profile Details
                    </Typography>
                    <TextField
                        type="text"
                        id="txtName"
                        margin="normal"
                        fullWidth
                        readOnly
                        value={userDetails.name}
                    />
                    <TextField
                        type="email"
                        id="txtEmail"
                        margin="normal"
                        fullWidth
                        value={userDetails.email}
                    />
                    <Button
                        style={{width: '50%', fontSize: 18, marginTop: 16}}
                        variant="outlined"
                    >
                        Edit Profile
                    </Button>
                    {/* <Button
                        style={{width: '50%', fontSize: 18, marginTop: 16}}
                        variant="outlined"
                        onClick={sendEmail}
                    >
                        Send Email
                    </Button> */}
                </CardContent>
            </Card>
            <div></div>
        </div>
    )
}

export default Profile
