
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


const EditFood = (props) => {
  const [name, setItemName] = useState(localStorage.getItem("curr_food_name"));
  const [price, setPrice] = useState(localStorage.getItem("curr_food_price"));
  const [type, setType] = useState(localStorage.getItem("curr_food_type"));
  const [add_on, setAddOn] = useState(localStorage.getItem("curr_food_add_on"));
  const [tags, setTags] = useState(localStorage.getItem("curr_food_tags"));
  const [shop, setShop] = useState(localStorage.getItem("curr_food_shop"));

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
    setAddOn(event.target.value);
  };
  const onChangeTags = (event) => {
    setTags(event.target.value);
  };
  const onChangeShop = (event) => {
    setShop(event.target.value);
  };


  const resetInputs = () => {
    setItemName("");
    setPrice("");
    setAddOn("");
    setTags("");
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
      tags: tags,
      shop: shop,
      _id: localStorage.getItem("curr_food_id"),
    };
    console.log(newFood);
    axios
      .post("http://localhost:4000/food/edit_food_item", newFood)
      .then((response) => {
        alert("Saved\t");
        console.log(response);
      });

    resetInputs();
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Item Name"
          variant="outlined"
          defaultValue={localStorage.getItem("curr_food_name")}
          onChange={onChangeItemName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          defaultValue={localStorage.getItem("curr_food_price")}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Food type</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={localStorage.getItem("curr_food_type")}
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
        <TextField
          label="Add on"
          variant="outlined"
          defaultValue={localStorage.getItem("curr_food_add_on")}
          onChange={onChangeAddOn}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tags"
          variant="outlined"
          defaultValue={localStorage.getItem("curr_food_tags")}
          onChange={onChangeTags}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop"
          variant="outlined"
          defaultValue={localStorage.getItem("curr_food_shop")}
          onChange={onChangeShop}
        />
      </Grid>
        <Button variant="contained" onClick={onAdd}>
          Save edited changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditFood;