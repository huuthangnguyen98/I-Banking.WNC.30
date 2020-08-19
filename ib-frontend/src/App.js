import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import IndexRoute from "./routers/index";
import Admin from "./components/Admin/Admin";
import Customer from "./components/Customer/Customer";
import Employee from "./components/Employee/Employee";
import * as actions from "./actions/index";
import UIState from "./reducers/UIState";
import { refreshingToken } from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
    };
  }

  componentDidMount() {
    var intervalID = setInterval(refreshingToken, 4 * 60 * 1000);
    this.setState({
      intervalID: intervalID,
    });
  }
  componentWillUnmount() {
    var intervalID = this.state.intervalID;
    clearInterval(intervalID);
  }

  // componentDidMount(dispatch) {
  //   const token = localStorage.getItem("token");
  //   if (token) this.props.onLogin(token);
  // }
  render() {
    let main;
    let role = this.props.Auth.role;
    const { UIState } = this.props;
    if (role === 0) main = <IndexRoute />;
    else if (role === 1) main = <Customer />;
    else if (role === 2) main = <Employee />;
    else if (role === 3) main = <Admin />;
    return (
      <Router>
        {UIState.spinner ? <div className="spinner" role="status"></div> : null}

        <div className="container">{main}</div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    UIState: state.UIState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => {
      dispatch(actions.loginWithToken(token));
    },
    // onRefreshingToken: () => {
    //   dispatch(actions.refreshingToken());
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
