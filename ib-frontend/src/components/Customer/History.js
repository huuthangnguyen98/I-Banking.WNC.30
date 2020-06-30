import React from "react";

const History = () => (
    <div className="row">
        <h4>Lịch sử giao dịch</h4>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Loại</th>
                    <th scope="col">Gửi</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Thời gian</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-primary">
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                <tr className="table-success">
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                </tr>
                <tr className="table-warning">
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default History;
