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
import { getSumForPeriod } from "../../util/streams";

async function getTransactions(currentUser: user) {
  const memberAddresses = await getAllMemberAddresses(
    currentUser!.partnersAgreementKey.communityAddress
  );
  const memberData = await getMembersData(memberAddresses);
  return Promise.all(
    memberData.map(async (member, index) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      console.log("fedfe", member.position != "Core Team");
      const payment = await getSumForPeriod(
        member.id,
        yesterday,
        new Date(),
        member.position != "Core Team"
      );
      console.log("payment", payment.toString());
      return {
        ...member,
        payment: payment.toString(),
        date: yesterday.toLocaleDateString(),
      };
    })
  );
}
interface transaction {
  id: string;
  name: string;
  date: number;
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
          <td className="content_table-fields-field">Date</td>
          <td className="content_table-fields-field">
            Paid (over the whole day)
          </td>
          <td className="content_table-fields-field">Invoice</td>
        </tr>
        {transactionData.map((transaction) => (
          <tr key={transaction.id} className="content_table-row">
            <td className="content_table-row-standard">{transaction.name}</td>
            <td className="content_table-row-standard">{transaction.date}</td>
            <td className="content_table-row-standard">
              {transaction.payment}
            </td>
            <td
              className="content_table-row-download"
              onClick={() =>
                postPayrollToIPFS(
                  transaction.id,
                  transaction.payment,
                  transaction.date,
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
