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
  Products,
  Services,
  Consulting,
  Marketing,
  SignUp,
} from "./pages/Overviews";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <Router>
      <Navbar />
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
