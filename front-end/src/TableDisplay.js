import React from "react";

export default function TableDisplay({ table }){
    return (
                <tbody>
                    <tr className="tables-row">
                        <td>{table.studentID}</td>
                        <td>{table.studentName}</td>
                        <td>{table.parentName}</td>
                        {/* <td>{table.LENGTH-TREATED}</td> */}
                        <td>{table.address}</td>
                        <td>{table.city}</td>
                        <td>{table.state}</td>
                        <td>{table.zipcode}</td>
                        <td>{table.lat}</td>
                        <td>{table.long}</td>
                    </tr>

                </tbody>
    )
}