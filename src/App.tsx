import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  Configurations,
  Order,
  Overview,
  Revenue,
  Users,
  History,
  ContactUs,
  Home,
  Services,
  Marketing,
  SignUp,
  Consulting,
} from "./pages/Overviews";
import Sidebar from "./components/sidebar/Sidebar";
import { Products } from "./components/product/Products";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/overview" component={Overview} exact></Route>
        <Route path="/overview/users" component={Users} exact></Route>
        <Route path="/overview/revenue" component={Revenue} exact></Route>
        <Route path="/order" component={Order} exact></Route>
        <Route path="/history" component={History} exact></Route>
        <Route path="/configurations" component={Configurations} exact></Route>

        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/consulting" component={Consulting} />
      </Switch>
    </Router>
  );
}

export default App;
