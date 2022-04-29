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
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import fuzzy from 'fuzzy';
const FoodListBuyer = (props) => {
  const navigate = useNavigate();
  const [food, setFood] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [type, setType] = useState("");
  const [sortName, setSortName] = useState(true);
  const onOrder = (food, dot) => {
    navigate('/order_food');
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
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const onChangeMin = (event) => {
    console.log(event.target.value);
    setMin(event.target.value);
  };
  const onChangeMax = (event) => {
    console.log(event.target.value);
    setMax(event.target.value);
  };
  const onChangeType = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  const sortChange = () => {
    let usersTemp = food;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Date(a.price) - new Date(b.price));
      } else {
        return 1;
      }
    });
    setFood(usersTemp);
    setSortName(!sortName);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              value={searchText}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Price
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Enter Min"
                  type="number"
                  value={min}
                  fullWidth={true}
                  onChange={onChangeMin}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Enter Max"
                  type="number"
                  value={max}
                  fullWidth={true}
                  onChange={onChangeMax}
                />
              </Grid>
            </Grid>
          </ListItem>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Type"
              value={type}
              fullWidth={true}
              onChange={onChangeType}
            />
          </Grid>
        </Grid>

        <Grid item xs={20} md={20} lg={20}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>
                  <TableCell>Add ons</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {food.map((food, ind) => (
                  <>
                    {
                      fuzzy.test(searchText, food.name) && searchText != '' && type == '' && food.price >= min && food.price <= max &&
                      <>
                        <TableRow key={ind}>
                          <TableCell>{ind}</TableCell>
                          <TableCell>{food.name}</TableCell>
                          <TableCell>{food.price}</TableCell>
                          <TableCell>{food.add_on}</TableCell>
                          <TableCell>{food.tags}</TableCell>
                          <TableCell>{food.type}</TableCell>
                          <TableCell>{food.shop}</TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => {
                              var opening = food.o_time;
                              var closing = food.c_time;
                              var dt = new Date();

                              var startTime = opening+":00";
                              var endTime = closing+":00";

                              var s = startTime.split(':');
                              var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

                              var e = endTime.split(':');
                              var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

                              var check1 = (dt >= dt1 && dt <= dt2) ? "1" : "0";
                              if(check1==="1")
                              {
                              localStorage.setItem("order_food_id", food._id);
                              localStorage.setItem("order_food_name", food.name);
                              localStorage.setItem("order_food_price", food.price);
                              localStorage.setItem("order_food_tags", food.tags);
                              localStorage.setItem("order_food_add_on", food.add_on);
                              localStorage.setItem("order_food_add_on2", food.add_on2);
                              localStorage.setItem("order_food_add_on3", food.add_on3);
                              localStorage.setItem("order_food_type", food.type);
                              localStorage.setItem("order_food_shop", food.shop);
                              localStorage.setItem("order_food_rating", food.sum);
                              localStorage.setItem("order_food_c_time", food.c_time);
                              localStorage.setItem("order_food_o_time", food.o_time);
                              onOrder();
                            }
                            else{
                              alert("Closed")
                            }
                            }}>ORDER
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    }
                  </>
                ))}
                {food.map((food, ind) => (
                  <>
                    {
                      food.type.includes(type) && searchText == '' && type != '' && food.price >= min && food.price <= max &&
                      <>
                        <TableRow key={ind}>
                          <TableCell>{ind}</TableCell>
                          <TableCell>{food.name}</TableCell>
                          <TableCell>{food.price}</TableCell>
                          <TableCell>{food.add_on}</TableCell>
                          <TableCell>{food.tags}</TableCell>
                          <TableCell>{food.type}</TableCell>
                          <TableCell>{food.shop}</TableCell>

                          <TableCell>
                            <Button variant="contained" onClick={() => {
                              var opening = food.o_time;
                              var closing = food.c_time;
                              var dt = new Date();

                              var startTime = opening+":00";
                              var endTime = closing+":00";

                              var s = startTime.split(':');
                              var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

                              var e = endTime.split(':');
                              var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

                              var check1 = (dt >= dt1 && dt <= dt2) ? "1" : "0";
                              if(check1==="1")
                              {
                              localStorage.setItem("order_food_id", food._id);
                              localStorage.setItem("order_food_name", food.name);
                              localStorage.setItem("order_food_price", food.price);
                              localStorage.setItem("order_food_tags", food.tags);
                              localStorage.setItem("order_food_add_on", food.add_on);
                              localStorage.setItem("order_food_add_on2", food.add_on2);
                              localStorage.setItem("order_food_add_on3", food.add_on3);
                              localStorage.setItem("order_food_type", food.type);
                              localStorage.setItem("order_food_shop", food.shop);
                              localStorage.setItem("order_food_rating", food.sum);
                              localStorage.setItem("order_food_c_time", food.c_time);
                              localStorage.setItem("order_food_o_time", food.o_time);
                              onOrder();
                            }
                            else{
                              alert("Closed")
                            }
                            }}>ORDER
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    }
                  </>
                ))}
                {food.map((food, ind) => (
                  <>
                    {
                      food.name.includes(searchText) && food.type.includes(type) && searchText != '' && type != '' && food.price >= min && food.price <= max &&
                      <>
                        <TableRow key={ind}>
                          <TableCell>{ind}</TableCell>
                          <TableCell>{food.name}</TableCell>
                          <TableCell>{food.price}</TableCell>
                          <TableCell>{food.add_on}</TableCell>
                          <TableCell>{food.tags}</TableCell>
                          <TableCell>{food.type}</TableCell>
                          <TableCell>{food.shop}</TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => {
                              var opening = food.o_time;
                              var closing = food.c_time;
                              var dt = new Date();

                              var startTime = opening+":00";
                              var endTime = closing+":00";

                              var s = startTime.split(':');
                              var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

                              var e = endTime.split(':');
                              var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

                              var check1 = (dt >= dt1 && dt <= dt2) ? "1" : "0";
                              if(check1==="1")
                              {
                              localStorage.setItem("order_food_id", food._id);
                              localStorage.setItem("order_food_name", food.name);
                              localStorage.setItem("order_food_price", food.price);
                              localStorage.setItem("order_food_tags", food.tags);
                              localStorage.setItem("order_food_add_on", food.add_on);
                              localStorage.setItem("order_food_add_on2", food.add_on2);
                              localStorage.setItem("order_food_add_on3", food.add_on3);
                              localStorage.setItem("order_food_type", food.type);
                              localStorage.setItem("order_food_shop", food.shop);
                              localStorage.setItem("order_food_rating", food.sum);
                              localStorage.setItem("order_food_c_time", food.c_time);
                              localStorage.setItem("order_food_o_time", food.o_time);
                              onOrder();
                              }
                              else{
                                alert("Closed")
                              }
                            }}>ORDER
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    }
                  </>
                ))}
                {food.map((food, ind) => (
                  <>
                    {
                      searchText == '' && type == '' && food.price >= min && food.price <= max &&
                      <>
                        <TableRow key={ind}>
                          <TableCell>{ind}</TableCell>
                          <TableCell>{food.name}</TableCell>
                          <TableCell><TableCell><TableCell>{food.price}</TableCell></TableCell></TableCell>
                          <TableCell>{food.add_on} {food.add_on2} {food.add_on3}</TableCell>
                          <TableCell>{food.tags}</TableCell>
                          <TableCell>{food.type}</TableCell>
                          <TableCell>{food.shop}</TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => {
                              var opening = food.o_time;
                              var closing = food.c_time;
                              var dt = new Date();

                              var startTime = opening+":00";
                              var endTime = closing+":00";

                              var s = startTime.split(':');
                              var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

                              var e = endTime.split(':');
                              var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

                              var check1 = (dt >= dt1 && dt <= dt2) ? "1" : "0";
                              if(check1==="1")
                              {
                              localStorage.setItem("order_food_id", food._id);
                              localStorage.setItem("order_food_name", food.name);
                              localStorage.setItem("order_food_price", food.price);
                              localStorage.setItem("order_food_tags", food.tags);
                              localStorage.setItem("order_food_add_on", food.add_on);
                              localStorage.setItem("order_food_add_on2", food.add_on2);
                              localStorage.setItem("order_food_add_on3", food.add_on3);
                              localStorage.setItem("order_food_type", food.type);
                              localStorage.setItem("order_food_shop", food.shop);
                              localStorage.setItem("order_food_rating", food.sum);
                              localStorage.setItem("order_food_c_time", food.c_time);
                              localStorage.setItem("order_food_o_time", food.o_time);
                              onOrder();
                            }
                            else{
                              alert("Closed")
                            }
                            }}>ORDER
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

export default FoodListBuyer;
