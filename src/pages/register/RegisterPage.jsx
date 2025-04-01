import { useState } from "react";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from '../../lib/validationForm';
import styled from 'styled-components'
// import "./register.css";
export default function RegisterPage() {
const StyledWrapper = styled.div`
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 2em;
        padding-right: 2em;
        padding-bottom: 0.4em;
        background-color: #171717;
        border-radius: 25px;
        transition: .4s ease-in-out;
    }

    .form:hover {
        transform: scale(1.05);
        border: 1px solid black;
    }

    #heading {
        text-align: center;
        margin: 2em;
        color: rgb(255, 255, 255);
        font-size: 1.2em;
    }

    .field {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        border-radius: 25px;
        padding: 0.6em;
        border: none;
        outline: none;
        color: white;
        background-color: #171717;
        box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
    }

    .input-icon {
        height: 1.3em;
        width: 1.3em;
        fill: white;
    }

    .input-field {
        background: none;
        border: none;
        outline: none;
        width: 100%;
        color: #d3d3d3;
    }

    .form .btn {
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-top: 2.5em;
    }

    .button1 {
        padding: 0.5em;
        padding-left: 1.1em;
        padding-right: 1.1em;
        border-radius: 5px;
        margin-right: 0.5em;
        border: none;
        outline: none;
        transition: .4s ease-in-out;
        background-color: #252525;
        color: white;
    }

    .button1:hover {
        background-color: black;
        color: white;
    }

    .button2 {
        padding: 0.5em;
        padding-left: 2.3em;
        padding-right: 2.3em;
        border-radius: 5px;
        border: none;
        outline: none;
        transition: .4s ease-in-out;
        background-color: #252525;
        color: white;
    }

    .button2:hover {
        background-color: black;
        color: white;
    }

    .button3 {
        margin-bottom: 3em;
        padding: 0.5em;
        border-radius: 5px;
        border: none;
        outline: none;
        transition: .4s ease-in-out;
        background-color: #252525;
        color: white;
    }

    .button3:hover {
        background-color: red;
        color: white;
    }`; 
       const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName:"",
        lastName:"",
        username: "",
        password:"",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted (true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error){
        const errors = getErrors(error); 
        setFormErrors (errors);
        console. log(errors);
        }
        console.log(data);
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState [property]);
        setFormErrors ((prev) => ({ ...prev, [property]: message }));
        setTouchedFields ((prev) => ({...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields [property]) {
            return !!formErrors [property]
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
        ...prev,
        [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return(
        <StyledWrapper>
        

            <form onSubmit={onSubmit} className="form" noValidate>
                <p id="heading">Register</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField('email')}
                    onBlur={onBlur('email')}
                    aria-invalid = {isInvalid('email')}
                    required
                    placeholder="Email" 
                    autocomplete="on" 
                    />
                </div>
               
               {/* email  */}
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
 
                </svg>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField('email')}
                    onBlur={onBlur('email')}
                    aria-invalid = {isInvalid('email')}
                    required
                    placeholder="Email" 
                    autocomplete="on"
                    />
                {formErrors.email && <small>{formErrors.email}</small>}
                </div>
                {/* firstName and lastName  */}
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
 
                </svg>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={setField('firstName')}
                    onBlur={onBlur('firstName')}
                    aria-invalid = {isInvalid('firstName')}
                    required
                    placeholder="First Name" 
                    autocomplete="on"
                    />
                {formErrors.firstName && <small>{formErrors.firstName}</small>}
                </div>
               
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
 
                </svg>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={setField('lastName')}
                    onBlur={onBlur('lastName')}
                    aria-invalid = {isInvalid('lastName')}
                    required
                    placeholder="Last Name" 
                    autocomplete="on"
                    />
                {formErrors.lastName && <small>{formErrors.lastName}</small>}
                </div>

                {/* username  */}
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
 
                </svg>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={setField('username')}
                    onBlur={onBlur('username')}
                    aria-invalid = {isInvalid('username')}
                    required
                    placeholder="Username" 
                    autocomplete="on"
                    />
                {formErrors.username && <small>{formErrors.username}</small>}
                </div>
                {/* password  */}
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
 
                </svg>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={setField('password')}
                    onBlur={onBlur('password')}
                    aria-invalid = {isInvalid('password')}
                    required
                    placeholder="Password" 
                    autocomplete="on"
                    />
                {formErrors.password && <small>{formErrors.password}</small>}
                </div>
                <div className="btn">
                    <button type="submit">Sign Up</button>
                </div>
            </form> 
        </ StyledWrapper >
    )
    
    
};

