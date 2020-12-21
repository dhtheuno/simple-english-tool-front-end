import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import Paraphrase from "./components/paraphrasing.component";
import Findvocab from "./components/findvocab.component";
import Paraphrase from "./components/paraphrase.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            Tool 
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/paraphrase"} className="nav-link">
                Paraphrase
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/findvocab"} className="nav-link">
                Find
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/findvocab" component={Findvocab} />
            <Route exact path="/paraphrase" component={Paraphrase} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;