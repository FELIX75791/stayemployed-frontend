import React, {useRef, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import globalVal from '../../globalVal';
// import './LogIn.scss';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function LogIn(props) {
    // upload resume?
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [selectedFileName, setSelectedFileName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [option, setOption] = useState();
    const [errorLogIn, setErrorLogIn] = useState(false);
    // const navigate = useNavigate();
    // var disableUpload = true;

    // const [value, setValue] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  
  const login = async (email, password) => {
    try {
      const response = await fetch(globalVal.baseUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password}),
       });

      if (response.status === 401) {
        // fetch(globalVal.baseUrl + '/signup', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ name, email, password }),
        // })
        setErrorLogIn(true);
        console.log("Invalid email or password.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('Token:', data.access_token);
      // Store the token or handle the response as needed
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

    
    const handleSubmit = (e) => {
      e.preventDefault();
      login(email, password);  
    }

    const handleClose = () => {
        setEmail("");
        setPassword("");
        setErrorLogIn(false);
        props.handleClose();
    }

    const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <div>
        <Dialog open={props.open} onClose={props.handleClose} fullWidth="true">
            <DialogTitle>Log into your account:</DialogTitle>
            
            <DialogContent>
              <div className="input-section" style={{ overflow: "auto",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "30px"
                                                    }}>
                <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 1, width: '20ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  >
                  {/* <TextField
                          id="outlined-required"
                          label="Email:"
                          variant="standard"
                          value={email}
                          required
                          onChange={(e) => {
                              setEmail(e.target.value);
                    }} />
                  <TextField
                          id="outlined-required"
                          label="Password:"
                          variant="standard"
                          value={password}
                          required
                          onChange={(e) => {
                              setPassword(e.target.value);
                  }} /> */}
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel >Email</InputLabel>
                    <Input
                      id="email"
                      value={email}
                      required
                      error={errorLogIn ? true : false}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}  />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        required
                        error={errorLogIn ? true : false}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                </FormControl>
                <div>
                  <h9>
                    {errorLogIn === true ? "Invalid email or password. Please check your credentials or sign up if you don't have an account."
                        : ""}
                  </h9>
                
                </div>  
              </Box> 
              </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="outlined" autoFocus>Log In</Button>           
            </DialogActions>
            <DialogActions>
            <Link href="/signup">Sign Up Now!</Link> 
            </DialogActions>
        </Dialog>
        </div>
    );
}