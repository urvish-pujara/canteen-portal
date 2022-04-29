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

const EditProfile = (props) => {
  const [name, setName] = useState(localStorage.getItem("user_name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [contact, setContact] = useState(localStorage.getItem("contact"));
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [shop, setShop] = useState(localStorage.getItem("shop"));
  const [age, setAge] = useState(localStorage.getItem("age"));
  const [batch, setBatch] = useState(localStorage.getItem("batch"));
  const [c_time, setC_time] = useState(localStorage.getItem("c_time"));
  const [o_time, setO_time] = useState(localStorage.getItem("o_time"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
  const [amount, setAmount] = useState(0);

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
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
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
    setWallet(0);
    setAmount(0);
    setDate(null);
  };

  const onMoney = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      wallet: +wallet + +amount,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/money", newUser)
      .then((response) => {
        alert("Added\t");
        console.log(response.data);
        localStorage.setItem("wallet", response.data.wallet);
      });
    resetInputs();
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
      wallet: wallet + amount,
      date: Date.now(),
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/profile", newUser)
      .then((response) => {
        alert("Saved\t" + response.data.name);
        console.log(response.data);
        localStorage.setItem("user_name", response.data.name);
        localStorage.setItem("contact", response.data.contact);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("batch", response.data.batch);
        localStorage.setItem("o_time", response.data.o_time);
        localStorage.setItem("c_time", response.data.c_time);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("date", response.data.date);
        localStorage.setItem("password", response.data.password);
        localStorage.setItem("wallet", response.data.wallet);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      {
        user === '2' && 
        <>
        <Grid item xs={12}>
            Money in wallet: {localStorage.getItem("wallet")}<br /><br /><br />
            <TextField
            label="Amount to add"
            variant="outlined"
            value={amount}
            onChange={onChangeAmount}
            />
        </Grid><br />
        <Grid item xs={12}>
        <Button variant="contained" onClick={onMoney}>
          ADD
        </Button>
      </Grid>
        </>
      }
      
        
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          defaultValue={localStorage.getItem("user_name")}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          defaultValue={localStorage.getItem("email")}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact no."
          variant="outlined"
          defaultValue={localStorage.getItem("contact")}
          onChange={onChangeContact}
        />
      </Grid>
      
        
      {
        localStorage.getItem("user") === '2' && 
        <>
        <Grid item xs={12}>
          Buyer<br /><br />
          <TextField
            label="Age"
            variant="outlined"
            defaultValue={localStorage.getItem("age")}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={localStorage.getItem("batch")}
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
        localStorage.getItem("user") === '1' && 
          <>
          <Grid item xs={12}>
            Vendor<br /><br />
          <TextField
            label="Shop"
            variant="outlined"
            defaultValue={localStorage.getItem("shop")}
            onChange={onChangeShop}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opening_time"
              variant="outlined"
              defaultValue={localStorage.getItem("o_time")}
              onChange={onChangeO_time}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing_time"
              variant="outlined"
              defaultValue={localStorage.getItem("c_time")}
              onChange={onChangeC_time}
            />
          </Grid>
          </>
      }

      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          defaultValue={localStorage.getItem("password")}
          onChange={onChangePassword}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Save edited changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditProfile;