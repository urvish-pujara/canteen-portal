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
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
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
  const navigate = useNavigate();
    const onSubmit = (props) =>{
      
      navigate('/edit_profile');
    };
  return (
    <Grid container align={"center"} spacing={2}>
      
      
        
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          defaultValue={localStorage.getItem("user_name")}
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          defaultValue={localStorage.getItem("email")}
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact no."
          variant="outlined"
          defaultValue={localStorage.getItem("contact")}
          inputProps={{ readOnly: true }}
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
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={localStorage.getItem("batch")}
                inputProps={{ readOnly: true }}
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
            inputProps={{ readOnly: true }}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opening_time"
              variant="outlined"
              defaultValue={localStorage.getItem("o_time")}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing_time"
              variant="outlined"
              defaultValue={localStorage.getItem("c_time")}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          </>
      }

      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          defaultValue={localStorage.getItem("password")}
          inputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Edit profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;