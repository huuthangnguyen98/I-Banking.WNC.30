import React, { Component } from "react";
import NavCustomer from "../Customer/NavCustomer";
import CusRoutes from "../../routers/CusRoutes";
import NavTopCustomer from "./NavTopCustomer";
import { connect } from "react-redux";

import * as CustomerActions from "../../actions/CustomerActions";
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
    };
  }
  componentDidMount() {
    this.props.onFetchNotifications_first();
    var intervalID = setInterval(this.props.onFetchNotifications, 3000);
    this.setState({
      intervalID: intervalID,
    });
  }
  componentWillUnmount() {
    var intervalID = this.state.intervalID;
    clearInterval(intervalID);
  }
  render() {
    return (
      <div>
        <div className="container-fluid">
          <NavTopCustomer />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <div className="container-fluid">
                <NavCustomer />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="container mt-4">
                <CusRoutes />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UIState: state.UIState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNotifications: () => {
      dispatch(CustomerActions.fetchNotificationsReq());
    },
    onFetchNotifications_first: () => {
      dispatch(CustomerActions.firstfetchNotificationsReq());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
