import React, { useState, useContext, useEffect } from 'react'
import { Card, CardContent, TextField, Typography, Button, LinearProgress } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import dialogContext from '../contexts/dialog/dialogContext';
import noteContext from '../contexts/notes/noteContext';

const Login = () => {
  let navigate = useNavigate();

  const { setSnakMsg } = useContext(dialogContext)
  const { setToken } = useContext(noteContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState({
    error: '',
    emptyFields: [],
    invalidFields: []
  })

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('https://backend-of-reactnotes.herokuapp.com/api/auth/login',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const json = await res.json()
    if(res.ok) {
      if(json.authToken) {
        localStorage.setItem('token', json.authToken)
        setToken(json.authToken)
        setLoading(false)
        navigate('/')
        setSnakMsg('Login Successful')
      }
    }else{
      // Handle Error
      console.log(json)
      setError(json)
    }
    setLoading(false)
  }

  return (
    <div className='grid-login' style={{marginTop: 90}}>
        <div></div>
      <Card variant='outlined'>
        <div style={{height: 2}}>
          {loading && <LinearProgress />}
        </div>
        <CardContent>
            <Typography variant="h5" component="div">
                LOGIN
            </Typography>
            <TextField
                type="email"
                id="txtEmail"
                margin="normal"
                label="Email"
                required
                fullWidth
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                error={error.emptyFields!== undefined && error.emptyFields.includes('email') && email.length===0}
                // helperText={ error.invalidFields.includes('email') && error.error }
            />
            <TextField
                type="password"
                id="pwdPassword"
                margin="normal"
                label="Password"
                required
                fullWidth
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                error={ error.emptyFields!==undefined && error.emptyFields.includes('password') && password.length===0 || 
                      (error.invalidFields!==undefined && error.invalidFields.includes('password')) }
                helperText={ error.invalidFields!==undefined && error.invalidFields.includes('password') && error.error }
            />
            <Button
              style={{width: '50%', fontSize: 18, marginTop: 16}}
              variant="outlined"
              onClick={handleSubmit}
            >
              Login
            </Button>
            {error.error.length!==0 && error.invalidFields===undefined && <h4 className='error'>{error.error}</h4>}
            <Typography style={{marginTop: 20}} variant="h6" component="div">
              Not An User? <Link to='/signup'>SignUp Now</Link>
            </Typography>
        </CardContent>
      </Card>
      <div></div>
    </div>
  )
}

export default Login
