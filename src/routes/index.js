import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import RecoverPassword from "../pages/RecoverPassword";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Transactions from "../pages/Transactions";
import Sell from "../pages/Sell";
import ShowSale from "../pages/ShowSale";
import NewAdmin from "../pages/NewAdmin";
import NewProfile from "../pages/NewProfile";
import BalanceAdjust from "../pages/BalanceAdjust";
import Invoices from "../pages/Invoices";
import InvoiceDetails from "../pages/InvoiceDetails";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/recover-password" component={RecoverPassword} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/transactions" component={Transactions} isPrivate />
      <Route path="/sell" component={Sell} isPrivate />
      <Route path="/show-sales" component={ShowSale} isPrivate />
      <Route path="/add-profile" component={NewProfile} isPrivate />
      <Route path="/new-admin" component={NewAdmin} isPrivate />
      <Route path="/balance-adjustment" component={BalanceAdjust} isPrivate />
      <Route path="/invoices" component={Invoices} isPrivate />
      <Route path="/invoice-details" component={InvoiceDetails} isPrivate />
    </Switch>
  );
}
