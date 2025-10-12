import { monthNames } from "@/lib/utils"
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDashboardContext } from "./DashboardContext";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type DatasetType = {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
}
interface ChartData {
  labels: string[];
  datasets: DatasetType[];
}

export function MonthlyLineGraph() {
  const { dashboardData, categoryStatus } = useDashboardContext();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [monthCount, setMonthCount] = useState(0);
  useEffect(() => {
    const records = dashboardData.records
    if(records.length == 0){
      setChartData(null);
      return
    }
    const data: ChartData = {
      labels: [],
      datasets: [],
    }
    const firstDate = new Date(dashboardData.records[0].created_at);
    const lastDate = new Date(records[records.length-1].created_at);
    let monthCountTmp = 0;
    for(let y = firstDate.getFullYear(), m = firstDate.getMonth(); y != lastDate.getFullYear() || m != lastDate.getMonth()+1; ++m){
      if(m==12){
        ++y;
        m=0;
      }
      ++monthCountTmp;
      data.labels.push(`${monthNames[m]}, ${y}`);
    }
    setMonthCount(monthCountTmp);
    const datasetsMap = new Map<string,DatasetType>()
    dashboardData.records.forEach(record => {
      if(!categoryStatus.get(record.category)) return;
      const date = new Date(record.created_at);
      const label = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
      if(!datasetsMap.has(record.category)){
      }
      let value = datasetsMap.get(record.category)
      if(!value){
        value = {
          label: record.category,
          data: new Array(data.labels.length),
          borderColor: dashboardData.category_color.get(record.category),
          backgroundColor: dashboardData.category_color.get(record.category),
          borderWidth: 2,
        } as DatasetType;
        value.data.fill(0);
        datasetsMap.set(record.category, value);
      }
      for(let i=0; i<data.labels.length; ++i){
        if(data.labels[i] == label){
          value.data[i] += record.amount
          break;
        }
      }
    });
    data.datasets = Array.from(datasetsMap.values())
    setChartData(data);
  }, [dashboardData, categoryStatus]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Expenses For Each Category',
      },
    },
  };

  if (!chartData) return <div className="w-fit mx-auto">No data available.</div>;
  return (
    <div
      style={{ height: Math.max(300, monthCount * 20) }}
    >
      <Line options={options} data={chartData} />
    </div>
  );
}