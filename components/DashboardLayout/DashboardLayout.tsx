import { InitSwAuth } from "@skill-wallet/auth";
import React, { useContext, useEffect, useState } from "react";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import PayrollIcon from "../../assets/icons/PayrollIcon";
import TransactionsIcon from "../../assets/icons/TransactionsIcon";
import { AuthContext } from "../../contexts/AuthContext";
import { Menu } from "../../pages/dashboard";

const DashboardLayout = ({ menu, setMenu, children }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="container">
        <div className="left_panel">
          <div className="left_panel-top"></div>
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
              <div className="left_panel-center-menu-text">
                {currentUser && (currentUser! as any).isCoreTeamMember
                  ? "Burn Rate"
                  : "Income"}
              </div>
            </div>
            <div
              className="left_panel-center-menu"
              style={{
                backgroundColor: menu === Menu.SALARIES ? "#41A8F2" : "white",
                color: menu === Menu.SALARIES ? "white" : "black",
              }}
              onClick={() => setMenu(Menu.SALARIES)}
            >
              <div className="left_panel-center-menu-icon">
                <PayrollIcon color="white" />
              </div>
              <div className="left_panel-center-menu-text">Salaries</div>
            </div>
            <div
              className="left_panel-center-menu"
              style={{
                backgroundColor: menu === Menu.PAYSLIPS ? "#41A8F2" : "white",
                color: menu === Menu.PAYSLIPS ? "white" : "black",
              }}
              onClick={() => setMenu(Menu.PAYSLIPS)}
            >
              <div className="left_panel-center-menu-icon">
                <TransactionsIcon color="white" />
              </div>
              <div className="left_panel-center-menu-text">Payslips</div>
            </div>
          </div>
          <div className="left_panel-bottom"></div>
        </div>

        <div className="right_panel">
          <div className="right_panel-header">
            <div className="right_panel-header-title">
              {menu === Menu.DASHBOARD
                ? (currentUser! as any)?.isCoreTeamMember
                  ? "Burn Rate"
                  : "Income"
                : menu === Menu.SALARIES
                  ? "Salaries"
                  : "Payslips"
                }
            </div>
            <div className="right_panel-header-button">
              {/* {menu === Menu.SALARIES && (
                <Button onClick={() => setIsOpen(true)}>
                  + Add new employee
                </Button>
              )} */}
            </div>
          </div>
          <div className="right_panel-content-container">
            <div className="right_panel-content">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
