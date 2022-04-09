import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import {
  getAllMemberAddresses,
  getMembersData,
  getTokenIdByAddress,
  getUserByTokenId,
  user,
} from "../../util/skillwallet";
import { getFlowRate } from "../../util/superfluid";
async function getPayroll(currentUser: user) {
  const memberAddresses = await getAllMemberAddresses(
    currentUser!.partnersAgreementKey.communityAddress
  );
  const memberData = await getMembersData(memberAddresses);
  return Promise.all(
    memberData.map(async (member, index) => {
      const comp = await getFlowRate(
        member.id,
        "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"
      );
      return { ...member, compensation: comp };
    })
  );
}
interface payroll {
  id: string;
  position: string;
  name: string;
  compensation: string;
}
const PayrollTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [payrollData, setPayrollData] = useState([] as payroll[]);
  const [initializing, setInitiliazing] = useState(true);
  useEffect(() => {
    if (currentUser && initializing) {
      console.log("Current", currentUser);
      const loadData = getPayroll(currentUser);
      toast.promise(loadData, {
        pending: "Fetching salary data",
        success: "Loaded successfully",
        error: "Error",
      });
      loadData.then((payroll) => {
        setPayrollData(payroll);
        setInitiliazing(false);
      });
    }
  }, [currentUser, initializing]);

  if (!initializing) {
    return (
      <table className="content_table">
        <tr className="content_table-fields">
          <td className="content_table-fields-field">Position</td>
          <td className="content_table-fields-field">Name</td>
          <td className="content_table-fields-field">Salary</td>
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
