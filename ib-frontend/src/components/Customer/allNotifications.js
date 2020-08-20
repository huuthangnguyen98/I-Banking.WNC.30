import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import * as CustomerActions from "../../actions/CustomerActions";
class allNotifications extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  //
  componentDidMount() {
    document.title = "Thông báo";
  }
  componentWillUnmount() {
    document.title = "30-BANK";
  }
  render() {
    const { notifications } = this.props;
    const notiCSs = {
      overflowWrap: "break-word",
    };
    const itemsCountPerPage = 10;
    const startPage = (this.state.activePage - 1) * itemsCountPerPage;
    const endPage = startPage + itemsCountPerPage;
    const list_noti_show = notifications
      .slice(startPage, endPage)
      .map((item) => (
        <li
          className={`list-group-item ${
            item.status === 1 ? "list-group-item-secondary" : ""
          } `}
          style={notiCSs}
          key={item.id}
        >
          {item.status === 1 ? (
            <small style={{ color: "#646462" }}>{item.content}</small>
          ) : (
            <small>{item.content}</small>
          )}

          <small style={{ color: "blue" }}> - {item.updated_at}</small>
        </li>
      ));
      // done here
    return (
      <div className="container">
        <div className="row justify-content-sm-center">
          <div className="col-sm-8 col-sm-offset-2">
            <ul className="list-group mb-4">{list_noti_show}</ul>
          </div>
        </div>
        <div className="row justify-content-sm-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={notifications.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    on_read_a_notification: (id) => {
      dispatch(CustomerActions.read_a_notificationReq(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allNotifications);
