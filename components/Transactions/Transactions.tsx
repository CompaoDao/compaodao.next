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
import Loading from "../Loading/Loading";

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
              <td className="content_table-fields-field">Date</td>
              <td className="content_table-fields-field">Paid (over the whole day)</td>
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
        )
        : (
          <div>No data available</div>
        )
      }
    </>
  );
};

export default TransactionsTable;
