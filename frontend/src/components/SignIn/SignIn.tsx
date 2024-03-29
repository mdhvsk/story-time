// LoginPage.tsx
import React from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Link, ThemeProvider } from '@mui/material';
import theme from '../Theme';

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import axios from 'axios'
import {
  FormControl,
  InputLabel,
  MenuItem,

  Select,

} from "@mui/material";
import Theme from "../Theme";
import { useUser } from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  first_name: string
  last_name: string
  email: string
  password: string
}
const LoginPage: React.FC = () => {


  const { login } = useUser();
  const { register, formState: { errors }, handleSubmit, control } = useForm<IFormInput>()
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState("")

  const paperStyle = {
    position: 'relative', // Needed for the overlay to position correctly
    backgroundImage: 'url("books.jpeg")',
    backgroundSize: 'cover', // Cover the entire Paper
    backgroundPosition: 'center', // Center the background image
    // Overlay: Dark semi-transparent background
    // '&:before': {
    //   content: '""',
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    //   left: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha for darkness
    //   zIndex: 1, // Ensure the overlay is above the background image
    // }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    let api_input = JSON.stringify(data)
    console.log(api_input)

    const apiUrl = process.env.REACT_APP_HOST_URL

    try {
      console.log("Sending to db")
      const response = await axios.post(`http://${apiUrl}:5000/db/user/login`, api_input, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("User data in login form: ")
      console.log(response['data'])
      login(response['data']); // Adapt based on your actual API response
      navigate('/landing')
    } catch (e) {
      console.log("Error", e);
      setSubmitError("Invalid username or password")

    }
  }

  const handleRegister = () => {
    navigate('/register')
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          minHeight: '100vh', // Full screen height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4, // Padding
          position: 'relative', // Needed for the overlay to position correctly
          backgroundImage: 'url("books.jpeg")',
          backgroundSize: 'cover', // Cover the entire Paper
          // backgroundPosition: 'center',
          backgroundColor: 'black',
          overflow: 'hidden'


        }}>
        <Paper elevation={12} sx={{ maxWidth: 400, backgroundColor: 'white', padding: '50px', opacity: 1 }}>
          <Typography variant="h4" gutterBottom>Welcome to Bookmakers.AI!</Typography>

          <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    placeholder="Provide email address"
                    error={!!errors.email}
                    helperText={errors.email ? "Email must follow something@email.website pattern" : ""}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="Provide password"
                    error={!!errors.password}
                  // helperText={errors.password ? "Length must be between at least 6 " : ""}
                  />
                )}
              />
              <Button type="submit" color='primary' variant="contained">Log In</Button>
            </Box>
            <Typography variant="body1" className='text-invalid'>{submitError}</Typography>
            <Button color='inherit' fullWidth variant="outlined" onClick={handleRegister} sx={{ mt: 2, mb: 2 }}>
              Sign up Here
            </Button>
            <Typography variant="body1" className='text'>Demo username: trial@bookmakersai.com </Typography>
            <Typography variant="body1" className='text'>Demo password: reading123</Typography>

          </form>
        </Paper>
      </Paper>
    </ThemeProvider>
  );
};

export default LoginPage;
