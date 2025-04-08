import { useState } from "react";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from '../../lib/validationForm';
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";
import styled from 'styled-components'
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
// import { Button } from "@headlessui/react";
// import "./register.css";
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
        justify-content: start;
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

export default function RegisterPage() {
    const navigate = useNavigate();

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
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username
          }
        }
      });
      if (error) {
        toast.error("Signing up error 👎🏻!");
      } else {
        toast.success("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
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
        

            <form onSubmit={onSubmit} className="form mt-4" noValidate>
                <h2 id="heading">Sign Up</h2>
               
               {/* email  */}
                <p className="ml-3"> {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              
 
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
                    />
                </div>
                
                {/* firstName */}
                <p className="ml-3"> {formErrors.firstName && <div className="text-red-500">{formErrors.firstName}</div>}</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
             
 
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
                    />
                </div>
                
                {/* lastName  */}
                <p className="ml-3"> {formErrors.lastName && <div className="text-red-500">{formErrors.lastName}</div>}</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
               
 
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
                    />
                </div>

                {/* username  */}
                <p className="ml-3"> {formErrors.username && <div className="text-red-500">{formErrors.username}</div>}</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                
 
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
                    />
                </div>
                
                {/* password  */}
                <p className="ml-3"> {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}</p>
                <div className="field">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
 
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
                    />
                </div>
                <div>
                    <a  href="#"><p className="text-white">Already have an account? Login</p></a>
                   
                </div>
                
                <div className="btn">
                    <Button type="submit" variant="filled" color="white" className="rounded-full my-4  " >Sign Up</Button>
                </div>
            </form> 
        </ StyledWrapper >
    )
    
    
};

