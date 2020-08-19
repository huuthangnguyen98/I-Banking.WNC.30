import React, { Component } from "react";
import NavCustomer from "../Customer/NavCustomer";
import CusRoutes from "../../routers/CusRoutes";
import NavTopCustomer from "./NavTopCustomer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as CustomerActions from "../../actions/CustomerActions";
import { fetch_list_partnerReq } from "../../actions/index";
import DebtDetail from "./DebtDetail";
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
      show: true,
      debt: {},
    };
    //
    this.wrapperRef = React.createRef();
    this.NavRef = React.createRef();
  }

  componentDidMount() {
    //
    document.addEventListener("click", this.handleClick);
    //

    this.props.onFetchNotifications_first();
    this.props.on_fetchListPartner();
    var intervalID = setInterval(this.props.onFetchNotifications, 5000);
    this.setState({
      intervalID: intervalID,
    });
  }
  componentWillUnmount() {
    //
    document.removeEventListener("click", this.handleClick);
    //
    var intervalID = this.state.intervalID;
    clearInterval(intervalID);
  }

  handleClick = (event) => {
    const { target } = event;
    if (
      !this.wrapperRef.current.contains(target) &&
      !this.NavRef.current.contains(target)
    ) {
      this.props.onHide_notifi();
    }
  };

  read_a_notification = (id_noti, id_debt) => {
    const self = this;
    self.props.on_fetchDebtDetail(id_debt);
    self.props.on_read_a_notification(id_noti);
    self.props.onHide_notifi();
  };

  read_all_notifications = () => {
    const self = this;
    self.props.on_read_all_notifications();
  };
  render() {
    const listNoti = {
      top: "0px",
      zIndex: 1,
      position: "absolute",
      width: "350px",
      right: "100px",

      // overflow: "scroll",
      // height: "500px",
    };
    const notiCSs = {
      overflowWrap: "break-word",
    };
    const { notifications, UIState } = this.props;

    // List notification
    const list_noti_show = notifications.slice(0, 15).map((item) => (
      <li
        className={`list-group-item list-group-item-action ${
          item.status === 1 ? "list-group-item-secondary" : ""
        } `}
        style={notiCSs}
        key={item.id}
        onClick={() => this.read_a_notification(item.id, item.debtor_id)}
        data-toggle="modal"
        data-target="#debtDetailComponent"
      >
        {item.status === 1 ? (
          <small style={{ color: "#646462" }}>
            <i className="fa fa-check fa-sm" aria-hidden="true"></i>{" "}
            {item.content}
          </small>
        ) : (
          <small>{item.content}</small>
        )}

        <small style={{ color: "blue" }}> - {item.updated_at}</small>
      </li>
    ));
    return (
      <div>
        <div className="container-fluid" ref={this.NavRef}>
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
              <div className="container">
                <div ref={this.wrapperRef}>
                  {UIState.showNotifi ? (
                    <div style={listNoti}>
                      <button
                        className="dropdown-item btn btn-sm"
                        onClick={() => this.read_all_notifications()}
                        style={Object.assign(
                          { fontSize: "12px" },
                          { color: "blue" },
                          { backgroundColor: "white" }
                        )}
                      >
                        Đánh dấu đã xem tất cả
                      </button>
                      <ul
                        className="list-group"
                        style={Object.assign(
                          { overFlowY: "scroll" },
                          // { height: "400px" },
                          { maxHeight: "400px" },
                          { overflowX: "hidden" }
                        )}
                      >
                        {list_noti_show}
                      </ul>
                      <Link
                        to="/customer/allnotifications"
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          className="dropdown-item btn btn-sm"
                          style={{ backgroundColor: "white" }}
                          onClick={() => this.props.onHide_notifi()}
                        >
                          <small style={{ color: "blue" }}>Xem tất cả</small>
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
                <CusRoutes />
              </div>
            </div>
          </div>
        </div>
        {/* Modal to show Debt detail */}
        <DebtDetail />
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
    onFetchNotifications: () => {
      dispatch(CustomerActions.fetchNotificationsReq());
    },
    onFetchNotifications_first: () => {
      dispatch(CustomerActions.firstfetchNotificationsReq());
    },
    onToogle_showNotifi: () => {
      dispatch(CustomerActions.toogle_showNotifi());
    },
    onHide_notifi: () => {
      dispatch(CustomerActions.hide_notifi());
    },
    on_read_a_notification: (id) => {
      dispatch(CustomerActions.read_a_notificationReq(id));
    },
    on_read_all_notifications: () => {
      dispatch(CustomerActions.read_all_notifiReq());
    },
    on_fetchDebtDetail: (id) => {
      dispatch(CustomerActions.fetchDebtDetailReq(id));
    },
    on_fetchListPartner: () => {
      dispatch(fetch_list_partnerReq());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
