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
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const OrderList = (props) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [rate, setRate] = useState(0);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/order")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChangeRate = (event) => {
    setRate(event.target.value);
  };
  console.log(order);
  return (
    <div>
      <Grid container>
        <Grid item xs={20} md={20} lg={20}>
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
                  <TableCell>Count</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Buyer name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Wallet</TableCell>
                  <TableCell>Change Status</TableCell>
                  <TableCell>Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.map((order, ind) => (
                  <>
                  {
                    order.email === localStorage.getItem("email") && 
                    <>
                    <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.rating}</TableCell>
                    <TableCell>{order.add_on}</TableCell>
                    <TableCell>{order.tags}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.shop}</TableCell>
                    <TableCell>{order.count}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.buyer_name}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.wallet}</TableCell>
                    {
                      order.status === 'REJECTED' && 
                      <>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        localStorage.setItem("wallet",order.wallet);
                    }}>CLAIM REFUND
                      </Button>
                      </TableCell>
                      </>
                    }
                    {
                      order.status === 'READY FOR PICKUP' && 
                      <>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        const newOrder = {
                          _id: order._id,
                        };
                        axios
                          .post("http://localhost:4000/order/ready_to_collected", newOrder)
                          .then((response) => {
                            console.log(response.data);
                          });
                    }}>Collect order
                      </Button>
                      </TableCell>
                      </>
                    }
                    {
                      order.status === 'COLLECTED' && 
                      <>
                      <TableCell />
                      <TableCell>
                      <Box sx={{ '& > legend': { mt: 2 },}}>
                      <Typography component="legend">Rating</Typography>
                        <Rating
                          name="simple-controlled"
                          value={rate}
                          onChange={onChangeRate}
                        />
                      </Box>
                      </TableCell>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        const newOrder = {
                          food_id: order.food_id,
                          rate: rate,
                        };
                        axios
                          .post("http://localhost:4000/food/count", newOrder)
                          .then((response) => {
                            console.log(response.data);
                          });
                    }}>Submit rating
                      </Button>
                      </TableCell>
                      </>
                    }
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

export default OrderList;
