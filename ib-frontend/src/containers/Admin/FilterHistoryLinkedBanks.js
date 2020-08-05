import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { fetch_list_partnerReq } from "../../actions/index";
import * as AdminActions from "../../actions/AdminActions";
class FilterHistoryLinkedBanks extends Component {
  constructor(props) {
    super(props);
    const temp = new Date();
    const startDate = moment(temp).subtract(1, "months").toDate();
    //console.log(typeof startDate);
    this.state = {
      startDate: startDate,
      endDate: new Date(),
      now: new Date(),
    };
  }
  componentDidMount() {
    this.props.on_fetchListPartner();
  }
  handleChangeStartdate = (date) => {
    this.setState({
      startDate: date,
    });
    //console.log(moment(date).format("YYYY/MM/DD HH:mm:ss"));
  };
  handleChangeEnddate = (date) => {
    this.setState({
      endDate: date,
    });
    //console.log(moment(date).format("YYYY/MM/DD HH:mm:ss"));
  };
  handleInput = (e) => {
    e.preventDefault();
    var self = this;
    let date_from, date_to, bank_name;
    date_from = moment(this.state.startDate).format("YYYY/MM/DD HH:mm:ss");
    date_to = moment(this.state.endDate).format("YYYY/MM/DD HH:mm:ss");
    bank_name = this.refs.bank.value;
    var index = this.refs.bank.selectedIndex;
    if (index == 0) bank_name = "";
    this.props.on_fetchHistoryToLinkedBank(date_from, date_to, bank_name);
    //console.log(date_from + date_to + bank_name);
  };
  render() {
    const { Partners } = this.props;
    const listPartners_show = Partners.map((item) => (
      <option key={item.partnerId}>{item.partnerName}</option>
    ));
    return (
      <div>
        <form onSubmit={(e) => this.handleInput(e)}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <span className="mr-2">Từ ngày :</span>
                  <DatePicker
                    dateFormat="dd/MM/yyyy h:mm aa"
                    selected={this.state.startDate}
                    onChange={this.handleChangeStartdate}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <span className="mr-2">Đến ngày :</span>
                  <DatePicker
                    dateFormat="dd/MM/yyyy h:mm aa"
                    selected={this.state.endDate}
                    onChange={this.handleChangeEnddate}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    minDate={this.state.startDate}
                    maxDate={this.state.now}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
              <div className="form-row align-items-center">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ngân hàng
                </label>
                <div className="col">
                  <select className="custom-select mr-sm-2" ref="bank">
                    <option>Tất cả</option>
                    {listPartners_show}
                  </select>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary">
                    Tra cứu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Partners: state.Partners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    on_fetchListPartner: () => {
      dispatch(fetch_list_partnerReq());
    },
    on_fetchHistoryToLinkedBank: (date_from, date_to, bank_name) => {
      dispatch(
        AdminActions.fetchHistoryLinkedBankReq(date_from, date_to, bank_name)
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterHistoryLinkedBanks);
