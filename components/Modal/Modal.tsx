import React, { useState } from 'react';
import ReactModal from 'react-modal';
import CloseIcon from '../../assets/icons/CloseIcon';

const Modal = ({ modalIsOpen, setIsOpen }) => {
  const [userId, setUserId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [compensation, setCompensation] = useState('');

  const isValid = !!userId && !!walletAddress && !!userName && !!compensation;

  const clearData = () => {
    setUserId('');
    setWalletAddress('');
    setUserName('');
    setCompensation('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Call API here
    console.log(userId, walletAddress, userName, compensation);
  }

  const closeModal = () => {
    clearData();
    setIsOpen(false)
  }

  return (
    <ReactModal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-title">Add to Payroll</div>
          <div
            className="modal-header-close"
            onClick={() => closeModal()}
          >
            <CloseIcon />
          </div>
        </div>
      </div>

      <form className="modal-form-container" onSubmit={handleSubmit}>
        <div className="modal-form-row">
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
        </div>

        <div className="modal-form-row">
          <div className="modal-form-row-label">
            Compensation:
          </div>
          <input className="modal-form-row-input" type="text" name="compensation" value={compensation} onChange={(event ) => setCompensation(event.target.value)}  placeholder='Enter amount' />
        </div>
        <div className="modal-form-submit-container" >
          <input className="modal-form-submit" type="submit" value="Add to payroll" disabled={!isValid} style={{ opacity: isValid ? 1 : 0.2}}/>
        </div>
      </form>
    </ReactModal>
  )
}

export default Modal;