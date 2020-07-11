import React, { Component } from "react";
import { connect } from "react-redux";
//import * as CustomerActions from "../../actions/CustomerActions";
import thousandify from "thousandify";
class ShowUnpaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      des: "",
      created_at: "",
      id: "",
      amount: 0,
    };
  }
  toogleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    const { listDebtsToUser } = this.props;

    const listDebtsToUser_showUnpaid = listDebtsToUser
      .filter((item) => item.status === 1)
      .map((item) => {
        //--- copy from toUserList
        return null;
        //------------------------
      });
    if (this.state.show)
      var dash = (
        <div>
          <h5>
            Danh sách nợ chưa thanh toán <small>(được gửi tới)</small>{" "}
            <i
              className="fa fa-bell"
              style={{ color: "red" }}
              aria-hidden="true"
            ></i>
          </h5>
          <table
            className="table table-sm table-hover"
            style={{ fontSize: "15px" }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Tình trạng</th>
                <th scope="col">Tài khoản nhắc nợ</th>
                <th scope="col">
                  Số tiền <small>(VNĐ)</small>
                </th>

                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>{listDebtsToUser_showUnpaid}</tbody>
          </table>
        </div>
      );
    return (
      <div>
        <div className="d-flex justify-content-center">
          <button
            className={
              this.state.show
                ? "btn btn-secondary btn-sm mr-2 mb-3"
                : "btn btn-warning btn-sm mr-2 mb-3"
            }
            onClick={() => this.toogleShow()}
          >
            {this.state.show ? "Ẩn" : "Xem"} danh sách nợ chưa thanh toán
          </button>
        </div>

        {dash}
        {/* Modal to show debt detail to User */}
        <div
          className="modal fade"
          id="debtDetailToUserUnpaid"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel">
                  Thông tin chi tiết
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div>
                    <span className="badge badge-pill badge-secondary mr-2">
                      TK nhắc nợ
                    </span>{" "}
                    {this.state.id}
                  </div>
                  <div>
                    <span className="badge badge-pill badge-warning mr-2">
                      Số tiền
                    </span>{" "}
                    {thousandify(this.state.amount)} <small>VNĐ</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-info mr-2">
                      Nội dung
                    </span>{" "}
                    <small> {this.state.des}</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-success mr-2">
                      Thời gian tạo
                    </span>{" "}
                    <small> {this.state.created_at}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ShowUnpaid);
