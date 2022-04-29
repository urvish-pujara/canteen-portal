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
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("user_Fntwsi0BCqpBU0Seebg1X");
const OrderList = (props) => {
  let order_placed = 0;
    let order_accepted = 0;
    let order_cooking = 0;
    let order_completed = 0;
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  
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
                  <TableCell>Change Status</TableCell>
                </TableRow>
              </TableHead>
              {order.map((order, ind) => {
 
                  if(order.status === 'PLACED' && order.shop === localStorage.getItem("shop")){
                    order_placed ++;
                  }
                  if(order.status === 'ACCEPTED' && order.shop === localStorage.getItem("shop")){
                    order_accepted ++;
                  }
                  if(order.status === 'COOKING' && order.shop === localStorage.getItem("shop")){
                    order_cooking ++;
                  }
                  if(order.status === 'COLLECTED' && order.shop === localStorage.getItem("shop")){
                    order_completed ++;
                  }
                  })}
              <TableBody>
                {
                order.map((order, ind) => (
                  <>
                  {
                    order.shop === localStorage.getItem("shop") && 
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
                    {
                      order.status === 'PLACED' && 
                      <>
                      
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        {
                          if(localStorage.getItem("vendor_order_count") > 9)
                          alert("10 pending orders");
                        }
                        {
                          // localStorage.getItem("vendor_order_count") <= 9 &&
                          if(localStorage.getItem("vendor_order_count") <= 9){
                          alert("Accepted");
                          
                              const newOrder = {
                                _id: order._id,
                              };
                              const newOrder1 = {
                                email: localStorage.getItem("email"),
                                count: +localStorage.getItem("vendor_order_count") + 1,
                              };
                              localStorage.setItem("vendor_order_count",+localStorage.getItem("vendor_order_count")+1);
                              axios
                                .post("http://localhost:4000/user/count", newOrder1)
                                .then((response) => {
                                  console.log(response.data);
                                });
                              axios
                                .post("http://localhost:4000/order/accepted", newOrder)
                                .then((response) => {
                                  console.log(response.data);
                                  emailjs.send("service_ruqla9a","template_xzlbkkp",{
                                    from_name: "Vendor",
                                    to_name: "Buyer",
                                    message: "Your food order is accepted",
                                    });
                                })
                          }
                          
                        }
                    }}>ACCEPT
                      </Button>
                      </TableCell>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        const newOrder = {
                          _id: order._id,
                          wallet: +order.wallet + (order.quantity * order.price),
                        };
                        const newOrder1 = {
                          email: order.email,
                          wallet: +order.wallet + (order.quantity * order.price),
                        };
                        console.log(newOrder1);
                        axios
                          .post("http://localhost:4000/order/rejected", newOrder)
                          .then((response) => {
                            console.log(response.data);
                          });
                        axios
                        .post("http://localhost:4000/user/refund", newOrder1)
                        .then((response) => {
                          console.log(response.data);
                        });
                    }}>REJECT
                      </Button>
                      </TableCell>
                      </>
                    }
                    {
                      order.status === 'ACCEPTED' && 
                      <>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        const newOrder = {
                          _id: order._id,
                        };
                        axios
                          .post("http://localhost:4000/order/accepted_to_cooking", newOrder)
                          .then((response) => {
                            console.log(response.data);
                          });
                    }}>MOVE TO NEXT STAGE
                      </Button>
                      </TableCell>
                      </>
                    }
                    {
                      order.status === 'COOKING' && 
                      <>
                      <TableCell>
                      <Button variant="contained" onClick={()=>{
                        const newOrder = {
                          _id: order._id,
                        };
                        const newOrder1 = {
                          email: localStorage.getItem("email"),
                          count: localStorage.getItem("vendor_order_count") - 1,
                          
                        };
                        localStorage.setItem("vendor_order_count",localStorage.getItem("vendor_order_count")-1);
                        axios
                          .post("http://localhost:4000/user/count", newOrder1)
                          .then((response) => {
                            console.log(response.data);
                          });
                        axios
                          .post("http://localhost:4000/order/cooking_to_ready", newOrder)
                          .then((response) => {
                            console.log(response.data);
                          });
                    }}>MOVE TO NEXT STAGE
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
