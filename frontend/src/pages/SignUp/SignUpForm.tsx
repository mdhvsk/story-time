
import React, { useState } from 'react'

type Props = {}



const SignUpForm = (props: Props) => {

    const [fields, setFields] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": ""
    })

    const [errors, setErrors] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": ""
    })

    const handleChange = (field: string, value: string) => {
        console.log(field + ": " + value)
        setFields({
            ...fields,
            [field]: value
        })
    }

    // const validateForm = () => {
    //     const formFields = { ...fields };
    //     const formErrors = {
    //         "first_name": "",
    //         "last_name": "",
    //         "email": "",
    //         "password": ""
    //     };
    //     let formIsValid = true;

    //     if (!formFields["first_name"]) {
    //         formIsValid = false;
    //         formErrors["first_name"] = "Cannot be empty";
    //     }

    //     if (typeof formFields["first_name"] !== "undefined") {
    //         if (!formFields["first_name"].match(/^[a-zA-Z]+$/)) {
    //             formIsValid = false;
    //             formErrors["first_name"] = "Only letters";
    //         }
    //     }

    //     if (!formFields["last_name"]) {
    //         formIsValid = false;
    //         formErrors["last_name"] = "Cannot be empty";
    //     }

    //     if (typeof formFields["last_name"] !== "undefined") {
    //         if (!formFields["last_name"].match(/^[a-zA-Z]+$/)) {
    //             formIsValid = false;
    //             formErrors["last_name"] = "Only letters";
    //         }
    //     }
    //     if (!formFields["email"]) {
    //         formIsValid = false;
    //         formErrors["email"] = "Cannot be empty";
    //     }

    //     if (typeof formFields["email"] !== "undefined") {
    //         let lastAtPos = formFields["email"].lastIndexOf('@');
    //         let lastDotPos = formFields["email"].lastIndexOf('.');

    //         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //             formIsValid = false;
    //             formFields["email"] = "Email is not valid";
    //         }
    //     }
    // }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder='First Name' onChange={e => handleChange('first_name', e.target.value)} value={fields["first_name"]} />
                <span className="error">{errors["first_name"]}</span>
                <input type="text" placeholder='Last Name' onChange={e => handleChange('last_name', e.target.value)} value={fields["last_name"]} />
                <span className="error">{errors["last_name"]}</span>
                <input type="text" placeholder='email' onChange={e => handleChange('email', e.target.value)} value={fields["email"]} />
                <span className="error">{errors["email"]}</span>
                <input type="text" placeholder='password' onChange={e => handleChange('password', e.target.value)} value={fields["password"]} />
                <span className="error">{errors["password"]}</span>
                <button value="Submit">Sign up</button>
            </form>

        </div>
    )
}

export default SignUpForm