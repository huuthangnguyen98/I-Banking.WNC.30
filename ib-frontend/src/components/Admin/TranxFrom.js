import React, { Component } from "react";
import { connect } from "react-redux";

class TranxFrom extends Component {
  render() {
    const { statistic } = this.props;
    const 
    return (
      <div>
        <h5>Danh sách giao dịch chuyển tới</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statistic: state.statistic,
  };
};

export default connect(mapStateToProps, null)(TranxFrom);
//done here
