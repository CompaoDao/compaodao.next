import React, {  useState } from 'react';
import DashboardIcon from '../../assets/icons/DashboardIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import PayrollIcon from '../../assets/icons/PayrollIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import TransactionsIcon from '../../assets/icons/TransactionsIcon';
import { Menu } from '../../pages/dashboard';
import { truncateWallet } from '../../util/truncateWallet';
import Button from '../Button/Button';

const DashboardLayout = ({ menu, setMenu, children }) => {
  return (
    <div className="container">
      <div className="left_panel">
        <div className="left_panel-top">
          <LogoIcon />
        </div>
        <div className="left_panel-center">
          <div
            className="left_panel-center-menu"
            style={{
              backgroundColor: menu === Menu.DASHBOARD ? '#41A8F2' : 'white',
              color: menu === Menu.DASHBOARD ? 'white' : 'black'
            }}
            onClick={() => setMenu(Menu.DASHBOARD)}
          >
            <div
              className="left_panel-center-menu-icon"
            >
              <DashboardIcon color="white" />
            </div>
            <div className="left_panel-center-menu-text">
              Dashboard
            </div>
          </div>
          <div
            className="left_panel-center-menu"
            style={{
              backgroundColor: menu === Menu.PAYROLL ? '#41A8F2' : 'white',
              color: menu === Menu.PAYROLL ? 'white' : 'black'
            }}
            onClick={() => setMenu(Menu.PAYROLL)}
          >
            <div className="left_panel-center-menu-icon">
              <PayrollIcon color="white" />
            </div>
            <div className="left_panel-center-menu-text">
              Payroll
            </div>
          </div>
          <div
            className="left_panel-center-menu"
            style={{
              backgroundColor: menu === Menu.TRANSACTIONS ? '#41A8F2' : 'white',
              color: menu === Menu.TRANSACTIONS ? 'white' : 'black'
            }}
            onClick={() => setMenu(Menu.TRANSACTIONS)}
          >
            <div className="left_panel-center-menu-icon">
              <TransactionsIcon color="white" />
            </div>
            <div className="left_panel-center-menu-text">
              Transactions
            </div>
          </div>
        </div>
        <div className="left_panel-bottom">
          <div className="left_panel-bottom-icon">
            <ProfileIcon />
          </div>
          <div className="left_panel-bottom-wallet">
            {truncateWallet('0x24A2d17147F177F5a5d3e50C7717eC58Ccf4458D', 4)}
          </div>
          <div className="left_panel-bottom-logout" onClick={() => console.log('Handle Logout')}>
            <LogoutIcon />
          </div>
        </div>
      </div>

      <div className="right_panel">
        <div className="right_panel-header">
          <div className="right_panel-header-title">
            {menu === Menu.DASHBOARD
              ? 'Dashboard'
              : menu === Menu.PAYROLL
                ? 'Payroll'
                : 'Transactions'
            }
          </div>
          <div className="right_panel-header-button">
            <Button onClick={() => console.log('test')}>+ Add new employee</Button>
          </div>
        </div>
        <div className="right_panel-content-container">
          <div className="right_panel-content">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;