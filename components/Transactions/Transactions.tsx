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
import Loading from "../Loading/Loading";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      getTransactions(currentUser)
        .then((transaction) => {
          setTransactionData(transaction);
          setIsLoading(false);
        })
        .catch(err => {
          toast.error(`${err.message}`);
          setIsLoading(false);
        })
    }
  }, [currentUser]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {transactionData?.length
        ? (
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
        )
        : (
          <div>No data available</div>
        )
      }
    </>
  );
};

export default TransactionsTable;
