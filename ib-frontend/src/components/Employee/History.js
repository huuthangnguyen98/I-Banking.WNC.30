import React, { Component } from "react";

class History extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="form-group col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên đăng nhập hoặc số tài khoản"
                            />
                        </div>
                        <div className="form-group col">
                            <button type="submit" className="btn btn-primary">
                                Tra cứu
                            </button>
                        </div>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-primary">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr className="table-warning">
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default History;
