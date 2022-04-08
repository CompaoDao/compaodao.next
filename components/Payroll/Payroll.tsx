import React from 'react';

const samplePayrollData = [
  {
    id: 1,
    position: 'CEO',
    name: 'Drew Smith',
    compensation: '$300,000'
  },
  {
    id: 2,
    position: 'CEO',
    name: 'Drew Smith',
    compensation: '$300,000'
  },
  {
    id: 3,
    position: 'CEO',
    name: 'Drew Smith',
    compensation: '$300,000'
  },
  {
    id: 4,
    position: 'COO',
    name: 'Michael Smith',
    compensation: '$200,000'
  }
];

const PayrollTable = () => {
  return (
    <table className="content_table">
      <tr className="content_table-fields">
        <td className="content_table-fields-field">Position</td>
        <td className="content_table-fields-field">Name</td>
        <td className="content_table-fields-field">Compensation</td>
        <td className="content_table-fields-field">Action</td>
      </tr>
      {samplePayrollData.map(payroll => (
        <tr key={payroll.id} className="content_table-row">
          <td className="content_table-row-standard">{payroll.position}</td>
          <td className="content_table-row-standard">{payroll.name}</td>
          <td className="content_table-row-standard">{payroll.compensation}</td>
          <td className="content_table-row-remove" onClick={() => console.log(`Click remove id: ${payroll.id}`)}>Remove</td>
        </tr>
      ))}
    </table>
  )
}

export default PayrollTable;