import React, { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import PayrollTable from '../components/Payroll/Payroll';

enum Menu {
  DASHBOARD,
  PAYROLL,
  TRANSACTIONS
}

const Dashboard: NextPage = () => {
  const [menu, setMenu] = useState(Menu.PAYROLL);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashboardLayout>
          <PayrollTable />
        </DashboardLayout>
      </main>
    </div>
  )
}

export default Dashboard
