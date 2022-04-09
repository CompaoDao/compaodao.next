import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import DashboardGraphs from "../components/Dashboard/Dashboard";
import PayrollTable from "../components/Payroll/Payroll";
import TransactionsTable from "../components/Transactions/Transactions";

export enum Menu {
  DASHBOARD,
  PAYROLL,
  TRANSACTIONS,
}

const Dashboard: NextPage = () => {
  const [menu, setMenu] = useState(Menu.DASHBOARD);
  const showMenu = (menu: Menu) => {
    switch (menu) {
      case Menu.DASHBOARD:
        return <DashboardGraphs />;
      case Menu.PAYROLL:
        return <PayrollTable />;
      case Menu.TRANSACTIONS:
      default:
        return <TransactionsTable />;
    }
  };
  const communityAddress =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("skillWallet") &&
    JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
      .partnersAgreementKey.communityAddress;
  console.log("mmh", communityAddress);
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashb oard" />
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
