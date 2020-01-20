import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Transactions from "../pages/Transactions";
import Sell from "../pages/Sell";
import ShowSale from "../pages/ShowSale";
import NewAdmin from "../pages/NewAdmin";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/transactions" component={Transactions} isPrivate />
      <Route path="/sell" component={Sell} isPrivate />
      <Route path="/show-sales" component={ShowSale} isPrivate />
      <Route path="/add-admin" component={NewAdmin} isPrivate />
    </Switch>
  );
}
