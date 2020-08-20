import React, { Component } from "react";
import FilterHistoryLinkedBanks from "../../containers/Admin/FilterHistoryLinkedBanks";
import Tranx from "./Tranx";

class History extends Component {
  render() {
    return (
      <div className="container">
        <h5>Lịch sử giao dịch với các ngân hàng khác</h5>
        <hr />
        <FilterHistoryLinkedBanks />
        <hr />
        <Tranx />
      </div>
    );
  }
}

export default History;
// done here
