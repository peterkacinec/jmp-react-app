import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ReklamaciaList from "./containers/ReklamaciaList";
import NovaReklamacia from "./containers/NovaReklamacia";
import DetailReklamacia from "./containers/DetailReklamacia";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/reklamacie" exact component={ReklamaciaList} />
    <Route path="/reklamacia/new" exact component={NovaReklamacia} />
    <AppliedRoute path="/reklamacie/:id" exact component={DetailReklamacia} props={childProps}/>
    <Route component={NotFound} />
  </Switch>;