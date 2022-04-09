import next from "next";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { postPayrollToIPFS } from "../../util/IPFS";
import {
  getAllMemberAddresses,
  getMembersData,
  user,
} from "../../util/skillwallet";

async function getTransactions(currentUser: user) {
  const memberAddresses = await getAllMemberAddresses(
    currentUser!.partnersAgreementKey.communityAddress
  );
  const memberData = await getMembersData(memberAddresses);
  const payment = ["??", "??", "??", "??"]; //await getComp(memberAddresses) TODO IMPLEMENT
  return memberData.map((member, index) => {
    return {
      ...member,
      payment: payment[index],
      month: ((new Date().getMonth() - 1) % 12) + 1,
    };
  });
}
interface transaction {
  id: string;
  name: string;
  month: number;
  payment: string;
}
const TransactionsTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [transactionData, setTransactionData] = useState([] as transaction[]);
  const [initializing, setInitiliazing] = useState(true);
  useEffect(() => {
    if (currentUser && initializing) {
      console.log("Current", currentUser);
      const loadData = getTransactions(currentUser);
      toast.promise(loadData, {
        pending: "Fetching payslip data",
        success: "Loaded successfully",
        error: "Error",
      });
      loadData.then((transaction) => {
        setTransactionData(transaction);
        setInitiliazing(false);
      });
    }
  }, [currentUser, initializing]);

  if (!initializing) {
    return (
      <table className="content_table">
        <tr className="content_table-fields">
          <td className="content_table-fields-field">Name</td>
          <td className="content_table-fields-field">Month</td>
          <td className="content_table-fields-field">Payment</td>
          <td className="content_table-fields-field">Invoice</td>
        </tr>
        {transactionData.map((transaction) => (
          <tr key={transaction.id} className="content_table-row">
            <td className="content_table-row-standard">{transaction.name}</td>
            <td className="content_table-row-standard">{transaction.month}</td>
            <td className="content_table-row-standard">
              {transaction.payment}
            </td>
            <td
              className="content_table-row-download"
              onClick={() =>
                postPayrollToIPFS(
                  transaction.id,
                  transaction.payment,
                  transaction.month,
                  transaction.name
                ).then((hash) => {
                  console.log("Open", `https://ipfs.io/ipfs/${hash}`);
                })
              }
            >
              Create Payslip
            </td>
          </tr>
        ))}
      </table>
    );
  } else return null;
};

export default TransactionsTable;
