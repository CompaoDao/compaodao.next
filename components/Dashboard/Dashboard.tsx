import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { getWalletAddress } from "../../util/skillwallet";
import { getHourlyInflow, getHourlyOutflow, PeriodFlow } from "../../util/streams";
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [{
//     label: '# of Votes',
//     data: [12, 19, 3, 5, 2, 3],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)'
//     ],
//     borderColor: [
//       'rgba(255, 99, 132, 1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)'
//     ],
//     borderWidth: 1
//   }]
// }




const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [flow, setFlow] = useState([]);

  useEffect(() => {
    if(currentUser) {
      getFlowData();
    }
  }, [currentUser]);

  const getFlowData = async () => {
    setIsLoading(true);
    const isCoreTeamMember = currentUser?.isCoreTeamMember;
    const address = await getWalletAddress();
    const flowData = isCoreTeamMember
      ? await getHourlyOutflow(address)
      : await getHourlyInflow(address);

    const currency = flowData[0].currency;
    const labels = flowData.map(flow => moment(flow.start).format("LT"));
    const dataPoints = flowData.map(flow => Number(flow.sum));
    debugger;
    const data = {
      labels: labels,
      datasets: [
        {
          label: isCoreTeamMember ? `Burn Rate in ${currency}` : `Income in ${currency}`,
          data: dataPoints,
          fill: true,
          backgroundColor: "##41A8F2",
          borderColor: "#147eca"
        }
      ]
    };
    setFlow(data);
    setIsLoading(false);
  };

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="dashboard">
      <div className="dashboard-title">Income</div>
      <Line
        data={flow}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: true
        }}
      />
    </div>
  )
};

export default Dashboard;
