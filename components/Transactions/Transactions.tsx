import React from 'react';

const sampleTransactionsData = [
  {
    id: 1,
    name: 'Drew Smith',
    dateStart: '1/4/2022',
    dateEnd: '8/4/2022',
    payment: '$14,000',
    invoiceUrl: 'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1 '
  },
  {
    id: 2,
    name: 'Drew Smith',
    dateStart: '1/4/2022',
    dateEnd: '8/4/2022',
    payment: '$14,000',
    invoiceUrl: 'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1 '
  },
  {
    id: 3,
    name: 'Drew Smith',
    dateStart: '1/4/2022',
    dateEnd: '8/4/2022',
    payment: '$14,000',
    invoiceUrl: 'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1 '
  },
]

const TransactionsTable = () => {
    return (
      <table className="content_table">
        <tr className="content_table-fields">
          <td className="content_table-fields-field">Name</td>
          <td className="content_table-fields-field">Duration</td>
          <td className="content_table-fields-field">Payment</td>
          <td className="content_table-fields-field">Invoice</td>
        </tr>
        {/* {samplePayrollData.map(payroll => (
          <tr key={payroll.id} className="content_table-row">
            <td className="content_table-row-standard">{payroll.position}</td>
            <td className="content_table-row-standard">{payroll.name}</td>
            <td className="content_table-row-standard">{payroll.compensation}</td>
            <td className="content_table-row-remove" onClick={() => console.log(`Click remove id: ${payroll.id}`)}>Remove</td>
          </tr>
        ))} */}
      </table>
    )
}

export default TransactionsTable;