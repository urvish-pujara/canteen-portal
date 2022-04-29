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

const FoodList = (props) => {
     const navigate = useNavigate();
     const onEdit = (food,dot) =>{
         navigate('/edit_food');
     };
  const [food, setFood] = useState([]);
  const onAddFoodItem = (props) =>{
    navigate('/add_food_item');
  };
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
      <Grid item xs={12}>
        <Button variant="contained" onClick={onAddFoodItem}>
          Add food item
        </Button>
      </Grid>
        <Grid item xs={20} md={20} lg={20}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Add ons</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {food.map((food, ind) => (
                    <>
                    {(food.shop===localStorage.getItem("shop")) &&
                    <>
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    <TableCell>{food.rating}</TableCell>
                    <TableCell>{food.add_on}</TableCell>
                    <TableCell>{food.tags}</TableCell>
                    <TableCell>{food.type}</TableCell>
                    <TableCell>{food.shop}</TableCell>
                    <TableCell>{food.count}</TableCell>
                    <TableCell>
                    <Button variant="contained" onClick={()=>{
                        console.log(food);
                      axios
                        .post("http://localhost:4000/food/delete",food)
                        .then((response) => {
                          alert("Deleted data\t");
                        })
                        .catch((error)=>{
                            console.log(error)
                        });
                    }}>DELETE
                    </Button>
                    </TableCell>
                    <TableCell>
                    <Button variant="contained" onClick={()=>{
                        localStorage.setItem("curr_food_id", food._id);
                        localStorage.setItem("curr_food_name", food.name);
                        localStorage.setItem("curr_food_price", food.price);
                        localStorage.setItem("curr_food_tags", food.tags);
                        localStorage.setItem("curr_food_add_on", food.add_on);
                        localStorage.setItem("curr_food_type", food.type);
                        localStorage.setItem("curr_food_shop", food.shop);
                        localStorage.setItem("curr_food_count", food.count);
                        onEdit();
                    }}>EDIT
                    </Button>
                    </TableCell>
                  </TableRow>
                  </>
                  }
                  </>
                ))}
                
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FoodList;
