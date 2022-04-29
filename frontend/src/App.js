import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import FoodList from "./components/users/FoodList";
import FoodListBuyer from "./components/users/FoodListBuyer";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import AFI from "./components/common/AFI";
import Stats from "./components/users/Stats";
import EditFood from "./components/common/EditFood";
import OrderFood from "./components/common/OrderFood";
import OrderFoodList from "./components/users/OrderFoodList";
import OrderList from "./components/users/OrderList";
import OrderListBuyer from "./components/users/OrderListBuyer";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import EditProfile from "./components/common/EditProfile";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit_profile" element={<EditProfile />} />
          <Route path="add_food_item" element={<AFI />} />
          <Route path="food" element={<FoodList />} />
          <Route path="food_list" element={<FoodListBuyer />} />
          <Route path="edit_food" element={<EditFood />} />
          <Route path="order_food" element={<OrderFood />} />
          <Route path="order_food_list" element={<OrderFoodList />} />
          <Route path="order_list" element={<OrderList />} />
          <Route path="order_list_buyer" element={<OrderListBuyer />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
