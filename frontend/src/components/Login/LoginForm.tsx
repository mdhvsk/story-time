
import React, { useState } from 'react'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import axios from 'axios'
import {
    Box, Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import Theme from "../Theme";
import {useUser} from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss'

interface IFormInput {
    first_name: string
    last_name: string
    email: string
    password: string
}

const LoginForm = () => {
    const { login } = useUser();
    const {register, formState: { errors }, handleSubmit, control } = useForm<IFormInput>()
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()

    
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        let api_input = JSON.stringify(data)
        console.log(api_input)

        try {
            console.log("Sending to db")
            const response = await axios.post("http://127.0.0.1:5000/db/user/login", api_input, {
                headers: {
                    'Content-Type': 'application/json',
                }})
            console.log(response);
            login(response.data.data); // Adapt based on your actual API response
            navigate('/story/form')
        } catch (e) {
            console.log("Error", e);
        }
    }

    return (
        <>
            <ThemeProvider theme = {Theme}>
                <div className='register-form'>
                <Typography variant="h2" color="primary" component="div" className='title'>
                            Talemakers.AI
                        </Typography>
                    <Paper className='content' elevation={12} square={false}>
                        <Typography variant="h3" color="primary" component="div" className='header'>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className='form'>
                            <Box display="flex" flexDirection="column"  gap={2}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
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
                                    rules={{required: true, minLength: 6}}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="password"
                                            label="Password"
                                            placeholder="Provide any deteils: Interests, characters, etc."
                                            error={!!errors.password}
                                            helperText={errors.password ? "Length must be between at least 6 " : ""}
                                        />
                                    )}
                                />
                                <Button type="submit" color='primary' variant="contained">Submit</Button>
                            </Box>
                        </form>
                    </Paper>
                </div>
            </ThemeProvider>

        </>
    )
}

export default LoginForm
