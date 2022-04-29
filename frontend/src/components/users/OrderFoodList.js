import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const OrderFoodList = (props) => {
     const navigate = useNavigate();
     const onOrder = (food,dot) =>{
         navigate('/order_food');
         <TableCell>Order</TableCell>
     };
  const [food, setFood] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(food);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Add ons</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Order</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {food.map((food, ind) => (
                    
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    <TableCell>{food.rating}</TableCell>
                    <TableCell>{food.add_on}</TableCell>
                    <TableCell>{food.tags}</TableCell>
                    <TableCell>{food.type}</TableCell>
                    <TableCell>{food.shop}</TableCell>
                    <TableCell>{food.vendor_name}</TableCell>
                    <TableCell>
                    <Button variant="contained" onClick={()=>{
                        localStorage.setItem("order_food_id", food._id);
                        localStorage.setItem("order_food_name", food.name);
                        localStorage.setItem("order_food_price", food.price);
                        localStorage.setItem("order_food_tags", food.tags);
                        localStorage.setItem("order_food_add_on", food.add_on);
                        localStorage.setItem("order_food_add_on2", food.add_on2);
                        localStorage.setItem("order_food_add_on3", food.add_on3);
                        localStorage.setItem("order_food_type", food.type);
                        localStorage.setItem("order_food_shop", food.shop);
                        localStorage.setItem("order_food_rating", food.shop);
                        onOrder();
                    }}>ORDER
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderFoodList;
