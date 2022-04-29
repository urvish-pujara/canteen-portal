import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(null);
  const [user, setUser] = useState("");
  const [shop, setShop] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [c_time, setC_time] = useState("");
  const [o_time, setO_time] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeO_time = (event) => {
    setO_time(event.target.value);
  };

  const onChangeC_time = (event) => {
    setC_time(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setUser("");
    setAge("");
    setBatch("");
    setShop("");
    setO_time("");
    setC_time("");
    setPassword("");
    setDate(null);
  };
  
  
  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      contact: contact,
      user: user,
      age: age,
      batch: batch,
      shop: shop,
      o_time: o_time,
      c_time: c_time,
      password: password,
      wallet: 0,
      date: Date.now(),
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
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
          label="Contact no."
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            onChange={onChangeUser}
          >
            <MenuItem value={"1"}>Vendor</MenuItem>
            <MenuItem value={"2"}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
        
      {
        user === '2' && 
        <>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={batch}
                label="Batch"
                onChange={onChangeBatch}
              >
                <MenuItem value={"UG1"}>UG1</MenuItem>
                <MenuItem value={"UG2"}>UG2</MenuItem>
                <MenuItem value={"UG3"}>UG3</MenuItem>
                <MenuItem value={"UG4"}>UG4</MenuItem>
                <MenuItem value={"UG5"}>UG5</MenuItem>
              </Select>
            </FormControl>
        </Grid>
        </>
      }
      {
        user === '1' && 
          <>
          <Grid item xs={12}>
          <TextField
            label="Shop"
            variant="outlined"
            value={shop}
            onChange={onChangeShop}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opening_time"
              variant="outlined"
              value={o_time}
              onChange={onChangeO_time}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing_time"
              variant="outlined"
              value={c_time}
              onChange={onChangeC_time}
            />
          </Grid>
          </>
      }

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
          Register
        </Button>
      </Grid>
      
    </Grid>
  );
};

export default Register;