
import React,{useState , useEffect} from "react";
import { Avatar, Button , Paper, Grid , Container,Typography,TextField } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import useStyles from './styles';
import Input from './input';
import Icon from './icon';
import { signin, signup} from '../../actions/auth';

const initialState = { firstName : '', lastName:'' , email : '', password: '', confirmPassword : ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setIsSignUp] = useState(false);
    const [formData , setFormData] = useState(initialState);
    const state = null;
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, navigation))
        }else {
            dispatch(signin(formData, navigation))
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup );
        setShowPassword(false);
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res.tokenId;
        try {
            dispatch({type : 'AUTH', data: {result, token}})

            navigation('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try again later')
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin 
                        clientId="351336787772-dkemeat2jm9dhnsfb68n6efqim3ide9l.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick}
                            disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                            Google Sign In
                            </Button>
                        )}
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
