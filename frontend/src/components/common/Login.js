import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    
  const navigate = useNavigate();
  const go = (dot) =>{
      navigate('/profile');
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/user/login", newUser)
      .then((response) => {
        if(response.data.cond == 2){
          alert("Email not found\t");
        }
        else if(response.data.cond == 1){
          alert("Wrong password\t");
        }
        else{
          alert("Login successful\t");
          localStorage.setItem("user_name", response.data.user.name);
          localStorage.setItem("contact", response.data.user.contact);
          localStorage.setItem("age", response.data.user.age);
          localStorage.setItem("user", response.data.user.user);
          localStorage.setItem("shop", response.data.user.shop);
          localStorage.setItem("batch", response.data.user.batch);
          localStorage.setItem("o_time", response.data.user.o_time);
          localStorage.setItem("c_time", response.data.user.c_time);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("date", response.data.user.date);
          localStorage.setItem("password", response.data.user.password);
          localStorage.setItem("wallet", response.data.user.wallet);
          localStorage.setItem("vendor_order_count", response.data.user.count);
          go();
        }
      });
    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;