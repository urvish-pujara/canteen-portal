import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { bottomNavigationClasses } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";

const Home = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const onRegister = (props) =>{
    navigate('/register');
  };
  
  const onLogin = (props) =>{
    navigate('/login');
  };



  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onRegister}>
          Register
        </Button> <br /><br />
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
        __________________________________________________________________________________________________________________________________________________________________________
      </Grid>

      
    </Grid>
    
  );
};

export default Home;