import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import Home from "./components/Home";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default App;
