import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import IndexRoute from "./routers/index";
class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <IndexRoute />
                </div>
            </Router>
        );
    }
}

export default App;
