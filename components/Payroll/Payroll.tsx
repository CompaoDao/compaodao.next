import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CurrentUserContext,
  getAllMemberAddresses,
  getMembersData,
  getTokenIdByAddress,
  getUserByTokenId,
  user,
} from "../../util/skillwallet";
async function getPayroll(currentUser: user) {
  const memberAddresses = await getAllMemberAddresses(
    currentUser!.partnersAgreementKey.communityAddress
  );
  const memberData = await getMembersData(memberAddresses);
  const comp = ["??", "??", "??", "??"]; //await getComp(memberAddresses) TODO IMPLEMENT
  return memberData.map((member, index) => {
    return { ...member, compensation: comp[index] };
  });
}
interface payroll {
  id: string;
  position: string;
  name: string;
  compensation: string;
}
const PayrollTable = () => {
  const currentUser = useContext(CurrentUserContext);
  const [payrollData, setPayrollData] = useState([] as payroll[]);
  const [initializing, setInitiliazing] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    if (currentUser && initializing && !loadingData) {
      setLoadingData(true);
      console.log("Current", currentUser);
      const loadData = getPayroll(currentUser);
      toast.promise(loadData, {
        pending: "Fetching payroll data",
        success: "Loaded successfully",
        error: "Error",
      });
      loadData.then((payroll) => {
        setPayrollData(payroll);
        setInitiliazing(false);
      });
    }
  }, [currentUser, initializing, loadingData]);
  if (!initializing) {
    return (
      <table className="content_table">
        <tr className="content_table-fields">
          <td className="content_table-fields-field">Position</td>
          <td className="content_table-fields-field">Name</td>
          <td className="content_table-fields-field">Compensation</td>
          <td className="content_table-fields-field">Action</td>
        </tr>
        {payrollData.map((payroll) => (
          <tr key={payroll.id} className="content_table-row">
            <td className="content_table-row-standard">{payroll.position}</td>
            <td className="content_table-row-standard">{payroll.name}</td>
            <td className="content_table-row-standard">
              {payroll.compensation}
            </td>
            <td
              className="content_table-row-remove"
              onClick={() => console.log(`Click remove id: ${payroll.id}`)}
            >
              Remove
            </td>
          </tr>
        ))}
      </table>
    );
  } else {
    return null;
  }
};

export default PayrollTable;
