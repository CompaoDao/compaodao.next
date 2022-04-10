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
import Modal from "../Modal/Modal";
import { getFlowRate } from "../../util/superfluid";
import Loading from "../Loading/Loading";

async function getPayroll(currentUser: user) {
  const memberAddresses = await getAllMemberAddresses(
    currentUser!.partnersAgreementKey.communityAddress
  );
  const memberData = await getMembersData(memberAddresses);
  console.log(memberData);
  return Promise.all(
    memberData.map(async (member, index) => {
      const comp = await getFlowRate(
        member.id,
        "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"
      );
      return { ...member, compensation: comp * 3600 };
    })
  );
}
interface payroll {
  id: string;
  position: string;
  name: string;
  compensation: string;
}
const PayrollEach = (payroll: { payroll: payroll }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("cunfr", currentUser);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tempCompensation, setTempCompensation] = useState("");
  if (payroll.payroll.position != "Core Team")
    return (
      <>
        <Modal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          recipient={payroll.payroll.id}
          setTempCompensation={setTempCompensation}
          currentCompensation={
            tempCompensation != ""
              ? tempCompensation
              : payroll.payroll.compensation
          }
        />
        <tr key={payroll.payroll.id} className="content_table-row">
          <td className="content_table-row-standard">
            {payroll.payroll.position}
          </td>
          <td className="content_table-row-standard">{payroll.payroll.name}</td>
          <td className="content_table-row-standard">
            {tempCompensation != ""
              ? tempCompensation
              : payroll.payroll.compensation}
          </td>
          {currentUser && (currentUser! as any).isCoreTeamMember && (
            <td
              className="content_table-row-remove"
              onClick={() => setIsOpen(true)}
            >
              Change salary
            </td>
          )}
        </tr>
      </>
    );
  else return null;
};

const PayrollTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [payrollData, setPayrollData] = useState([] as payroll[]);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      getPayroll(currentUser)
        .then((payroll) => {
          setPayrollData(payroll);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(`${err.message}`);
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {payrollData?.length ? (
        <table className="content_table">
          <tr className="content_table-fields">
            <td className="content_table-fields-field">Position</td>
            <td className="content_table-fields-field">Name</td>
            <td className="content_table-fields-field">Salary (DAIx/hour)</td>
            {(currentUser! as any).isCoreTeamMember && (
              <td className="content_table-fields-field">Action</td>
            )}
          </tr>
          {payrollData.map((payroll) => (
            <PayrollEach key={payroll.id} payroll={payroll} />
          ))}
        </table>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

export default PayrollTable;
