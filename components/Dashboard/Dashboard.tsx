import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <div>DASHBOARD</div>;
  } else {
    return <div>CONNECT WALLET</div>;
  }
};

export default Dashboard;
