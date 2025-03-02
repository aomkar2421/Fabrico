import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getUser, register } from '../../State/Auth/Action'


const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store=>store);

    useEffect(()=>{
        if(jwt){
            console.log("GETTING USER DATA REGISTER FORM");
            dispatch(getUser(jwt))
        }
    },[jwt, auth.jwt])

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password")

        }

        dispatch(register(userData));
        console.log("User Data :- ", userData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            autoComplete="given-name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            autoComplete="given-name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            autoComplete="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            autoComplete="password"
                            type="password"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className="bg-[#9155FD] w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0", width: "100%" }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>If you already have an account?</p>
                    <Button
                        onClick={() => navigate("/login")}
                        className='ml-5'
                        size='small'
                    >
                        Login
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm