import { InitSwAuth } from "@skill-wallet/auth";
import React, { useEffect, useState } from "react";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import LogoIcon from "../../assets/icons/LogoIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import PayrollIcon from "../../assets/icons/PayrollIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import TransactionsIcon from "../../assets/icons/TransactionsIcon";
import { Menu } from "../../pages/dashboard";
import { CurrentUserContext } from "../../util/skillwallet";
import { truncateWallet } from "../../util/truncateWallet";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const DashboardLayout = ({ menu, setMenu, children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    InitSwAuth();
  }, []);
  useEffect(() => {
    typeof window !== undefined &&
      setCurrentUser(
        window.sessionStorage.getItem("skillWallet") &&
          JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
      );
  }, [typeof window !== undefined]);
  useEffect(() => {
    function handleStorage(e: Event) {
      // When local storage changes, dump the list to
      // the console.
      setCurrentUser(
        window.sessionStorage.getItem("skillWallet") &&
          JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
      );
      return null;
    }
    console.log("hufen", typeof window !== "undefined");
    typeof window !== "undefined" &&
      window.addEventListener("onSkillwalletLogin", handleStorage);
  });
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className="container">
        <div className="left_panel">
          <div className="left_panel-top">
            <LogoIcon />
          </div>
          <div className="left_panel-center">
            <div
              className="left_panel-center-menu"
              style={{
                backgroundColor: menu === Menu.DASHBOARD ? "#41A8F2" : "white",
                color: menu === Menu.DASHBOARD ? "white" : "black",
              }}
              onClick={() => setMenu(Menu.DASHBOARD)}
            >
              <div className="left_panel-center-menu-icon">
                <DashboardIcon color="white" />
              </div>
              <div className="left_panel-center-menu-text">Dashboard</div>
            </div>
            <div
              className="left_panel-center-menu"
              style={{
                backgroundColor: menu === Menu.PAYROLL ? "#41A8F2" : "white",
                color: menu === Menu.PAYROLL ? "white" : "black",
              }}
              onClick={() => setMenu(Menu.PAYROLL)}
            >
              <div className="left_panel-center-menu-icon">
                <PayrollIcon color="white" />
              </div>
              <div className="left_panel-center-menu-text">Payroll</div>
            </div>
            <div
              className="left_panel-center-menu"
              style={{
                backgroundColor:
                  menu === Menu.TRANSACTIONS ? "#41A8F2" : "white",
                color: menu === Menu.TRANSACTIONS ? "white" : "black",
              }}
              onClick={() => setMenu(Menu.TRANSACTIONS)}
            >
              <div className="left_panel-center-menu-icon">
                <TransactionsIcon color="white" />
              </div>
              <div className="left_panel-center-menu-text">Transactions</div>
            </div>
          </div>
          <div className="left_panel-bottom">
            {/*@ts-ignore*/}
            <sw-auth
              partner-key="75122500c30d00dd83c1a2c306d3e6e298ba70b7" //"212ffeaad53d44d5d685c17a48935a71e32b862f" //f407f2a2b646a7940f159ce27c2c9427c97dc853"
              use-dev="true"
            >
              {/*@ts-ignore*/}
            </sw-auth>
          </div>
        </div>

        <div className="right_panel">
          <div className="right_panel-header">
            <div className="right_panel-header-title">
              {menu === Menu.DASHBOARD
                ? "Dashboard"
                : menu === Menu.PAYROLL
                ? "Payroll"
                : "Transactions"}
            </div>
            <div className="right_panel-header-button">
              {menu === Menu.PAYROLL && (
                <Button onClick={() => setIsOpen(true)}>
                  + Add new employee
                </Button>
              )}
            </div>
          </div>
          <div className="right_panel-content-container">
            <div className="right_panel-content">{children}</div>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default DashboardLayout;
