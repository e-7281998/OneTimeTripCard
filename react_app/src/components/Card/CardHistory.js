import React from "react";
import Table from 'react-bootstrap/Table';

function CardHistory() {
    const arr = []
    for (var i = 0; i < 40; i++) {
        arr.push(i)
    }

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>일자</th>
                        <th>상태</th>
                        <th>금액</th>
                        <th>최종 결제 금액</th>
                        <th>할인혜택</th>
                        <th>가맹점명</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr.map(() =>
                            <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>

        </div>
    );
}

export default CardHistory;
