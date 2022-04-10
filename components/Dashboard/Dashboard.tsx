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
import { getHourlyInflow, getHourlyOutflow, getSumForPeriod, PeriodFlow } from "../../util/streams";
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

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [flowLoading, setFlowLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
  const [flow, setFlow] = useState([]);
  const [total, setTotal] = useState(0);

  const isCoreTeamMember = currentUser?.isCoreTeamMember;

  useEffect(() => {
    if(currentUser) {
      getFlowData();
      getTotalData();
    }
  }, [currentUser]);

  const getTotalData = async () => {
    setTotalLoading(true);
    const address = await getWalletAddress();
    const oneYearAgo = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const totalData = Number(await getSumForPeriod(address, new Date(oneYearAgo), new Date(), isCoreTeamMember));
    setTotal(totalData);
    setTotalLoading(false);
  }

  const getFlowData = async () => {
    setFlowLoading(true);
    const address = await getWalletAddress();
    const flowData = isCoreTeamMember
      ? await getHourlyOutflow(address)
      : await getHourlyInflow(address);

    const currency = flowData[0].currency;
    const labels = flowData.map(flow => moment(flow.start).format("LT"));
    const dataPoints = flowData.map(flow => Number(flow.sum));

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
    setFlowLoading(false);
  };

  if(flowLoading || totalLoading) {
    return <Loading />
  }

  return (
    <div className="dashboard">
      <div className="dashboard-total-container">
        <div className="dashboard-title">{`One Year Cumulative ${isCoreTeamMember ? `Spend` : `Income`}: `}</div>
        <div className="dashboard-total">{`${total} DAIx`}</div>
      </div>
      <div className="dashboard-line_graph">
        <div className="dashboard-title">
          {`${isCoreTeamMember ? `Burn Rate` : `Income`} in the Past 12 Hours`}
        </div>
        <Line
          data={flow}
          width={400}
          height={200}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
        />
      </div>
    </div>
  )
};

export default Dashboard;
