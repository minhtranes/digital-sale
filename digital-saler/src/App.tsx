import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {
  Configurations,
  Order,
  Overview,
  Revenue,
  Users,
  History,
} from "./pages/Overviews";
import Navbar from "./components/navbar/Navbar";

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
      </Switch>
    </Router>
  );
}

export default App;
