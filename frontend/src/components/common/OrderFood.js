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
import Slider from '@mui/material/Slider';

const OrderFood = (props) => {
  const [name, setItemName] = useState(localStorage.getItem("order_food_name"));
  const [price, setPrice] = useState(localStorage.getItem("order_food_price"));
  const [type, setType] = useState(localStorage.getItem("order_food_type"));
  const [add_on, setAddOn] = useState("");
  const [add_on2, setAddOn2] = useState("");
  const [add_on3, setAddOn3] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tags, setTags] = useState(localStorage.getItem("order_food_tags"));
  const [rating, setRating] = useState(localStorage.getItem("order_food_rating"));
  const [shop, setShop] = useState(localStorage.getItem("order_food_shop"));
  const [count, setCount] = useState(localStorage.getItem("order_food_count"));
  const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
  const [cost, setCost] = useState(0);
  
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const onChangeAddOn = (event) => {
    setAddOn("Cheese");
    setAddOn(+wallet - 10);
    console.log(add_on);
    console.log(wallet);
  };
  const onChangeAddOn2 = (event) => {
    setAddOn2("Maggi_masala");
    setAddOn(+wallet - 5);
    console.log(add_on2);
    console.log(wallet);
  };
  const onChangeAddOn3 = (event) => {
    setAddOn3("Butter");
    setAddOn(+wallet - 5);
    console.log(add_on3);
    console.log(wallet);
  };

  const resetInputs = () => {
    setItemName("");
    setPrice("");
    setAddOn("");
    setAddOn2("");
    setAddOn3("");
    setTags("");
    setType("");
    setRating("");
    setShop("");
    setCount("");
    setCost(0);
    setQuantity(1);
  };

  const onAdd = (event) => {
    
    event.preventDefault();

    const newFood = {
      name: name,
      price: price,
      type: type,
      rating: rating,
      add_on: add_on,
      add_on2: add_on2,
      add_on3: add_on3,
      tags: tags,
      shop: shop,
      count: count,
      quantity: quantity,
      c_time: localStorage.getItem("order_food_c_time"),
      o_time: localStorage.getItem("order_food_o_time"),
      cost: quantity * price,
      email: localStorage.getItem("email"),
      wallet: +wallet - +(quantity * price),
      buyer_name: localStorage.getItem("user_name"),

    };
    const newFood1 = {
      email: localStorage.getItem("email"),
      wallet: +wallet - +(quantity * price),
    };
    
    console.log(newFood);
    console.log(newFood1);
      if(wallet >= newFood.cost){
        axios
      .post("http://localhost:4000/order/order_food_item", newFood)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
       axios
       .post("http://localhost:4000/user/deduct_money", newFood1)
       .then((response) => {
         console.log(response.data);
         localStorage.setItem("wallet",response.data.wallet);
       });
      resetInputs();
      }
      if(wallet < newFood.cost){
        alert("Not enough money\t");
      }
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={name}
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Type"
          variant="outlined"
          value={type}
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: 300 }}>Quantity:
          <Slider
            label="Quantity"
            value={quantity}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            onChange={onChangeQuantity}
          /></Box>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Quantity"
          variant="outlined"
          value={quantity}
          inputProps={{ readOnly: true }}
        />
      </Grid><br />
      <Grid item xs={12}>
      <Grid item xs={12}>
      {
        localStorage.getItem("order_food_add_on") === 'Cheese' &&
        <>
          <Button variant="contained" onClick={onChangeAddOn}>
            Cheese 10
          </Button>
        </>
      }
      </Grid><br />
      <Grid item xs={12}>
      {
        localStorage.getItem("order_food_add_on2") === 'Maggi_masala' &&
        <>
          <Button variant="contained" onClick={onChangeAddOn2}>
            Maggi_masala 5
          </Button>
        </>
      }
      </Grid><br />
      <Grid item xs={12}>
      {
        localStorage.getItem("order_food_add_on3") === 'Butter' &&
        <>
          <Button variant="contained" onClick={onChangeAddOn3}>
            Butter 5
          </Button>
        </>
      }
      </Grid><br />
      <Grid item xs={12}>
        <TextField
          label="Rating"
          variant="outlined"
          value={rating}
          inputProps={{ readOnly: true }}
        />
      </Grid><br />
      <Grid item xs={12}>
        <TextField
          label="Tags"
          variant="outlined"
          value={tags}
          inputProps={{ readOnly: true }}
        />
      </Grid><br />
      <Grid item xs={12}>
        <TextField
          label="Shop"
          variant="outlined"
          value={shop}
          inputProps={{ readOnly: true }}
        />
      </Grid><br />
      <Grid item xs={12}>
        <TextField
          label="Cost"
          variant="outlined"
          value={quantity * price}
          inputProps={{ readOnly: true }}
        />
      </Grid><br />
        <Button variant="contained" onClick={onAdd}>
          Add item
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderFood;