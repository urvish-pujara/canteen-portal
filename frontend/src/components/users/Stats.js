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

const Stats = (props) => {
    let order_placed = 0;
    let order_accepted = 0;
    let order_cooking = 0;
    let order_completed = 0;
    let frq = new Map();
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
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Orders placed</TableCell>
                  <TableCell>Orders pending</TableCell>
                  <TableCell>Orders completed</TableCell>
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
                <TableRow>
                  <TableCell>{order_placed}</TableCell>
                  <TableCell>{order_accepted + order_cooking}</TableCell>
                  <TableCell>{order_completed}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <br /><br /><br />
      <Grid container>
          
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Food name</TableCell>
                  <TableCell>No. of orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { 
                order.forEach((user) => {
                  const t = frq.get(user.name);
                  if(user.name!="")frq.set(user.name , (t === undefined ? 0: t)+1);
                }
                )}
                {
                  ( Array
                    .from(frq.entries(), ([k, v]) => [k, v])).sort((a,b) =>  (b[1] - a[1]))
                    .filter((val, i)=> {if (i < 5) return val;})
                    .map((ele,i) => (
                      <TableRow>
                      <TableCell>{i}</TableCell>
                      <TableCell>{ele[0]}</TableCell>
                      <TableCell>{ele[1]}</TableCell>
                      <TableCell> 
                      </TableCell>
                    </TableRow>)
                    )
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;
