import React, { Component } from "react";
import Noibo from "./TransferScreens/Noibo";
import LienNh from "./TransferScreens/LienNh";
import * as CustomerActions from "../../actions/CustomerActions";
import { connect } from "react-redux";
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: true,
    };
  }
  componentWillUnmount() {
    document.title = "30-BANK";
  }
  componentDidMount() {
    document.title = "Chuyển khoản";
    var self = this;
    self.props.onFetchReceivers();
  }
  changeClass = () => {
    this.setState({
      class: !this.state.class,
    });
  };
  render() {
    let main;
    if (this.state.class) main = <Noibo />;
    else main = <LienNh />;
    return (
      <div>
        <h4>Chuyển khoản</h4>
        <div className="d-flex justify-content-around">
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              name="ChuyenKhoanNoiBo"
              id="ChuyenKhoanNoiBo"
              className="custom-control-input"
              checked={this.state.class}
              onChange={() => this.changeClass()}
            />
            <label className="custom-control-label" htmlFor="ChuyenKhoanNoiBo">
              Chuyển khoản Nội bộ
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              name="ChuyenKhoanLienNganHang"
              id="ChuyenKhoanLienNganHang"
              className="custom-control-input"
              checked={!this.state.class}
              onChange={() => this.changeClass()}
            />
            <label
              className="custom-control-label"
              htmlFor="ChuyenKhoanLienNganHang"
            >
              Chuyển khoản Liên ngân hàng
            </label>
          </div>
        </div>
        <hr />
        <div className="container mt-3">{main}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.listReceivers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveReceiver: (id) => {
      dispatch(CustomerActions.removeReceiver(id));
    },
    onChange: (id, name) => {
      dispatch(CustomerActions.changeReceiverReq(id, name));
    },
    onFetchReceivers: () => {
      dispatch(CustomerActions.fetchReceiversReq());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
