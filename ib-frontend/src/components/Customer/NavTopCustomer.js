import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { Link } from "react-router-dom";
import * as CustomerActions from "../../actions/CustomerActions";
class Nav extends Component {
  render() {
    const username = localStorage.getItem("username");
    const notiCSs = {
      border: "none",
      overflowWrap: "break-word",
    };
    const { notifications, UIState } = this.props;
    const list_noti_show = notifications.slice(0, 4).map((item) => (
      <li className="list-group-item" style={notiCSs} key={item.id}>
        <small>{item.content}</small>
        <small style={{ color: "blue" }}> - {item.updated_at}</small>
      </li>
    ));

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            30-BANK
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link">{username}</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  id="notiDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.onToogle_newNotifi(false)}
                >
                  {UIState.hasNewNotifi ? (
                    <i
                      className="fa fa-bell fa-lg"
                      style={{ color: "red" }}
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i className="fa fa-bell-o fa-lg" aria-hidden="true"></i>
                  )}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="notiDropdown"
                  style={{ width: "400px" }}
                >
                  <ul className="list-group">
                    {list_noti_show}

                    <Link
                      to="/customer/allnotifications"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="dropdown-item">
                        <small style={{ color: "blue" }}>Xem tất cả</small>
                      </button>
                    </Link>
                  </ul>
                </div>
              </li>

              <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className="fa fa-user-circle-o fa-lg"
                    aria-hidden="true"
                  ></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link to="/changepw" style={{ textDecoration: "none" }}>
                    <button className="dropdown-item">
                      Đổi mật khẩu{" "}
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </button>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <button
                      className="dropdown-item"
                      onClick={() => this.props.onLogout()}
                    >
                      Đăng xuất{" "}
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    UIState: state.UIState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
    },
    onToogle_newNotifi: (status) => {
      dispatch(CustomerActions.toogle_newNotifi(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
