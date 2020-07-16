import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { Link } from "react-router-dom";
import * as CustomerActions from "../../actions/CustomerActions";
class Nav extends Component {
  handle = () => {
    this.props.onToogle_showNotifi();
    this.props.onToogle_newNotifi(false);
  };

  render() {
    const username = localStorage.getItem("username");

    const { UIState } = this.props;

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            30-BANK
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <span className="nav-link">{username}</span>
              </li>
              <li className="nav-item  mr-2 ml-2">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handle()}
                >
                  {UIState.hasNewNotifi ? (
                    <span>
                      <i
                        className="fa fa-bell fa-lg"
                        aria-hidden="true"
                        style={Object.assign(
                          { pointerEvents: "none" },
                          { color: "red" }
                        )}
                      ></i>{" "}
                      <span className="badge badge-danger notibtn">
                        {UIState.num}
                      </span>
                    </span>
                  ) : (
                    <span>
                      {" "}
                      <i
                        className="fa fa-bell-o fa-lg"
                        aria-hidden="true"
                        style={{ pointerEvents: "none" }}
                      ></i>
                    </span>
                  )}
                </span>
              </li>
              <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
                <span
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
                </span>
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
    onToogle_showNotifi: () => {
      dispatch(CustomerActions.toogle_showNotifi());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
