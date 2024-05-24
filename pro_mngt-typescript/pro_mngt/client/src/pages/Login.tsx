import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Grid, Paper, Box, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authenticate/action";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginFormInputs } from '../types/types';
import { RootStore } from '../redux/store';
import { AppDispatch } from '../redux/store'

const Login: React.FC = () => {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm<LoginFormInputs>();

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootStore) => state.user);

    useEffect(() => {
        if (Object.keys(user.login).length > 0) {
            navigate('/products');
        } else if (user.error) {
            toast.error(user.error);
        }
    }, [user, navigate]);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(login(data));
        if (user.login && typeof user.login === 'object' && user.login.token) {
            localStorage.setItem('token', JSON.stringify(user.login.token));
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
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
                                label="Password"
                                type="password"
                                id="password"
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
                                Sign In
                            </Button>
                            <Link to="/register">Not having an account? SIGN UP</Link>
                        </form>
                        <ToastContainer />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Login;
