import React, { Component } from "react";
import { connect } from "react-redux";
class allNotifications extends Component {
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
    const list_noti_show = notifications.map((item) => (
      <li className="list-group-item" style={notiCSs} key={item.id}>
        <small>{item.content}</small>
        <small style={{ color: "blue" }}> - {item.updated_at}</small>
      </li>
    ));
    return (
      <div className="container">
        <div className="row justify-content-sm-center">
          <div className="col-sm-8 col-sm-offset-2">
            <ul className="list-group">{list_noti_show}</ul>
          </div>
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

export default connect(mapStateToProps, null)(allNotifications);
