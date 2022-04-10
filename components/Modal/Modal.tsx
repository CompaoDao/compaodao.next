import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import CloseIcon from "../../assets/icons/CloseIcon";
import { createFlow, updateFlow } from "../../util/superfluid";
import { BigNumber, ethers } from "ethers";

const Modal = ({
  modalIsOpen,
  setIsOpen,
  setTempCompensation,
  recipient,
  currentCompensation,
}) => {
  // const [userId, setUserId] = useState('');
  // const [walletAddress, setWalletAddress] = useState('');
  // const [userName, setUserName] = useState('');
  const [compensation, setCompensation] = useState("");

  const isValid = !!compensation;

  const clearData = () => {
    // setUserId('');
    // setWalletAddress('');
    // setUserName('');
    setCompensation("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTempCompensation(compensation);
    console.log("comp", compensation);
    console.log("comp", recipient);
    const weiPerSecond = ethers.utils.parseEther(compensation).div(BigNumber.from(3600)).toString();
    const updating =
      currentCompensation != "0"
        ? updateFlow(
            recipient,
            "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f",
            weiPerSecond
          )
        : createFlow(
            recipient,
            "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f",
            weiPerSecond
          );
    toast.promise(updating, {
      pending: "Updating compensation",
      success: "Success!",
      error: "Error",
    });
    console.log(compensation);
    setIsOpen(false);
  };

  const closeModal = () => {
    clearData();
    setIsOpen(false);
  };

  return (
    <ReactModal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-title">Change Salary</div>
          <div className="modal-header-close" onClick={() => closeModal()}>
            <CloseIcon />
          </div>
        </div>
      </div>

      <form className="modal-form-container" onSubmit={handleSubmit}>
        {/* <div className="modal-form-row">
          <div className="modal-form-row-label">
            User ID:
          </div>
          <input className="modal-form-row-input" type="text" name="user_id" value={userId} onChange={(event ) => setUserId(event.target.value)} placeholder='Enter user id' />
        </div>

        <div className="modal-form-row">
          <div className="modal-form-row-label">
            Wallet Address:
          </div>
          <input className="modal-form-row-input" type="text" name="wallet_address" value={walletAddress} onChange={(event ) => setWalletAddress(event.target.value)}  placeholder='Enter wallet address' />
        </div>

        <div className="modal-form-row">
          <div className="modal-form-row-label">
            Name:
          </div>
          <input className="modal-form-row-input" type="text" name="user_name" value={userName} onChange={(event ) => setUserName(event.target.value)}  placeholder='Enter name' />
        </div> */}

        <div className="modal-form-row">
          <div className="modal-form-row-label">{`Salary (DAIx/hour): `}</div>
          <input
            className="modal-form-row-input"
            type="text"
            name="compensation"
            value={compensation}
            onChange={(event) => setCompensation(event.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="modal-form-submit-container">
          <input
            className="modal-form-submit"
            type="submit"
            value="Confirm"
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.2 }}
          />
        </div>
      </form>
    </ReactModal>
  );
};

export default Modal;
