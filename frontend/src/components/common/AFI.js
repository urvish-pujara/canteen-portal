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
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const AFI = (props) => {
  const [name, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Non-veg");
  const [add_on, setAddOn] = useState("");
  const [add_on2, setAddOn2] = useState("");
  const [add_on3, setAddOn3] = useState("");
  // const [tags, setTags] = useState("");
  const [shop, setShop] = useState("");

  const onChangeItemName = (event) => {
    setItemName(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const onChangeType = (event) => {
    setType(event.target.value);
  };
  const onChangeAddOn = (event) => {
    setAddOn("Cheese");
  };
  const onChangeAddOn2 = (event) => {
    setAddOn2("Maggi_masala");
  };
  const onChangeAddOn3 = (event) => {
    setAddOn3("Butter");
  };
  // const onChangeTags = (event) => {
  //   setTags(event.target.value);
  // };
  const onChangeShop = (event) => {
    setShop(event.target.value);
  };
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Hot',
  'Cold',
  'Drinks',
  'Spicy',
];
const [tags, settags] = React.useState([]);

  const onChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    settags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const resetInputs = () => {
    setItemName("");
    setPrice(0);
    setAddOn("");
    setAddOn2("");
    setAddOn3("");
    settags([]);
    setType("");
    setShop("");
  };

  const onAdd = (event) => {
    event.preventDefault();

    const newFood = {
      name: name,
      price: price,
      type: type,
      add_on: add_on,
      add_on2: add_on2,
      add_on3: add_on3,
      tags: tags,
      shop: localStorage.getItem("shop"),
      vendor_name: localStorage.getItem("user_name"),
      c_time: localStorage.getItem("c_time"),
      o_time: localStorage.getItem("o_time"),
    };
    console.log(newFood);
    axios
      .post("http://localhost:4000/food/add_food_item", newFood)
      .then((response) => {
        alert("Added\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={name}
          onChange={onChangeItemName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Food type</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Non-veg"
                name="radio-buttons-group"
                onChange={onChangeType}
            >
                <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
                <FormControlLabel value="Non-veg" control={<Radio />} label="Non-Veg" />
        </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
      <Grid item xs={12}>
        ADD ONs:
        <br /><br />
        <Button variant="contained" onClick={onChangeAddOn}>
          Cheese
        </Button>
        <br /><br />
        <Button variant="contained" onClick={onChangeAddOn2}>
          Maggi_Masala
        </Button>
        <br /><br />
        <Button variant="contained" onClick={onChangeAddOn3}>
          Butter
        </Button>
      </Grid>
      
      <Grid item xs={12}>
        {/* <TextField
          label="Tags"
          variant="outlined"
          value={tags}
          onChange={onChangeTags}
        /> */}
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tags}
          onChange={onChangeTags}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={tags.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      
      
        <Button variant="contained" onClick={onAdd}>
          Add item
        </Button>
      </Grid>
    </Grid>
  );
};

export default AFI;