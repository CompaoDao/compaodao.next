import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data for dashboard
  }, [currentUser]);

  if(isLoading) {
    return <Loading />
  }

  return (
    <div>DASHBOARD</div>
  )
};

export default Dashboard;
