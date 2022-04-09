import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import DashboardGraphs from "../components/Dashboard/Dashboard";
import PayrollTable from "../components/Payroll/Payroll";
import TransactionsTable from "../components/Transactions/Transactions";

export enum Menu {
  DASHBOARD,
  SALARIES,
  PAYSLIPS,
}

const Dashboard: NextPage = () => {
  const [menu, setMenu] = useState(Menu.DASHBOARD);
  const showMenu = (menu: Menu) => {
    switch (menu) {
      case Menu.DASHBOARD:
        return <DashboardGraphs />;
      case Menu.SALARIES:
        return <PayrollTable />;
      case Menu.PAYSLIPS:
      default:
        return <TransactionsTable />;
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout menu={menu} setMenu={setMenu}>
          {showMenu(menu)}
        </DashboardLayout>
      </main>
    </div>
  );
};

export default Dashboard;
