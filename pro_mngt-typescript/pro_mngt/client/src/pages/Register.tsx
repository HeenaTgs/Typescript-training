import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, Button, TextField, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authenticate/action";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterFormInputs } from '../types/types';
import { AppDispatch, RootStore } from '../redux/store'

const Register: React.FC = () => {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm<RegisterFormInputs>();

    const dispatch = useDispatch<AppDispatch>();
    const info = useSelector((state: RootStore) => state.user);

    useEffect(() => {
        if (Object.keys(info.register).length > 0) {
            navigate('/');
        } else if (info.error) {
            toast.error(info.error);
        }
    }, [info, navigate]);

    const onSubmit:SubmitHandler<RegisterFormInputs> = (data) => {
        dispatch(registerUser(data));
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="sm">
                <Box textAlign="center" my={8}>
                    <Typography variant="h4" component="h1">
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label="User Name"
                            autoComplete="username"
                            autoFocus
                            {...register("username", { required: true })}
                            error={!!errors.username}
                            helperText={errors.username && "Username is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? "Please enter a valid email" : ""}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                            error={!!errors.password}
                            helperText={errors.password && "Password is required"}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <ToastContainer />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register;
