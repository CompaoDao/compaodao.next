import React, { useContext } from "react";
import { CurrentUserContext } from "../../util/skillwallet";

const Dashboard = () => {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser) {
    return <div>DASHBOARD</div>;
  } else {
    return <div>CONNECT WALLET</div>;
  }
};

export default Dashboard;
