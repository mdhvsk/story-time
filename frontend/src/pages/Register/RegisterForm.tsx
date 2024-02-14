
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'

interface IFormInput {
    first_name: string
    last_name: string
    email: string
    password: string
}

const RegisterForm = () => {

    const {register, formState: { errors }, handleSubmit } = useForm<IFormInput>()
    const [validated, setValidated] = useState(false)
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        let api_input = JSON.stringify(data)
        console.log(api_input)


        try {
            console.log("Sending to db")
            const response = await axios.post("http://localhost:5000/db/user/insert", api_input, {
                headers: {
                  'Content-Type': 'application/json',
                }})
            console.log(response);
        } catch (e) {
            console.log("Error", e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("first_name", { required: true, minLength: 2 })} />
                {errors.first_name?.type === "required" && (
                    <p role="alert">First name is required</p>
                )}
                {errors.first_name?.type === "minLength" && (
                    <p role="alert">First name is too short</p>
                )}

                <input {...register("last_name", { required: true, minLength: 2 })} />
                {errors.last_name?.type === "required" && (
                    <p role="alert">Last name is required</p>
                )}
                {errors.last_name?.type === "minLength" && (
                    <p role="alert">Last name is too short</p>
                )}
                <input {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                {errors.email?.type === "required" && (
                    <p role="alert">Email is required</p>
                )}
                {errors.email?.type === "pattern" && (
                    <p role="alert">Invalid email</p>
                )}
                <input type="password" {...register("password", { required: true, minLength: 6 })} />
                {errors.password?.type === "required" && (
                    <p role="alert">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                    <p role="alert">Password is too short</p>
                )}
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default RegisterForm