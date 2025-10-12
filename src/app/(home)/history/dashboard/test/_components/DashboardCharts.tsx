import { getContrastYIQ, monthNamesAbbr } from "@/lib/utils"
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabel from 'chartjs-plugin-datalabels';
import { Context as DataLabelsContext } from 'chartjs-plugin-datalabels';
import { useDashboardContext } from "./DashboardContext";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabel,
);

export function MonthlyLineGraph() {
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
    let _monthCount = 0;
    for(let y = firstDate.getFullYear(), m = firstDate.getMonth(); y != lastDate.getFullYear() || m != lastDate.getMonth()+1; ++m){
      if(m==12){
        ++y;
        m=0;
      }
      ++_monthCount;
      data.labels.push(`${monthNamesAbbr[m]}, ${y}`);
    }
    setMonthCount(_monthCount);
    const datasetsMap = new Map<string,DatasetType>()
    dashboardData.records.forEach(record => {
      if(!categoryStatus.get(record.category)) return;
      const date = new Date(record.created_at);
      const label = `${monthNamesAbbr[date.getMonth()]}, ${date.getFullYear()}`;
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
        text: 'Monthly Expenses for each Category',
      },
      datalabels: {
        display: false,
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

export function CategoryPieChart() {
  type DatasetType = {
    label: string;
    data: number[];
    borderColor?: string[];
    backgroundColor?: string[];
    borderWidth?: number;
  }
  interface ChartData {
    labels: string[];
    datasets: DatasetType[];
  }
  const { dashboardData, categoryStatus } = useDashboardContext();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  useEffect(() => {
    if(dashboardData.records.length == 0){
      setChartData(null);
      return
    }

    const labels: string[] = [];
    const datasetsData: number[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];

    dashboardData.amount_by_category.forEach((amount,category)=>{
      if(categoryStatus.get(category)){
        labels.push(category);
        datasetsData.push(amount);
        backgroundColor.push(dashboardData.category_color.get(category)!);
        borderColor.push("#000000");
      }
    });

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: 'Amount',
          data: datasetsData,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  }, [dashboardData, categoryStatus]);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pie Chart of Expenses in each Category',
      },
      datalabels: {
        color: (context: DataLabelsContext)=>{
          const backgroundColors = context.chart.data.datasets[context.datasetIndex].backgroundColor as string[];
          const backgroundColor = backgroundColors[context.dataIndex];
          return getContrastYIQ(backgroundColor, "#000", "#fff");
        },
        font: {
          weight: 'bold',
          size: 14,
        },
        // The formatter function is key for calculating the percentage
        formatter: (value: number, context: DataLabelsContext) => {
          // The data array for the pie chart, asserted as an array of numbers
          const dataPoints = context.chart.data.datasets[0].data as number[];
          const total = dataPoints.reduce((sum: number, dataPoint: number) => sum + dataPoint, 0);
          const percentage = (value / total) * 100;
          
          // Ensure that the percentage is a valid number before formatting
          if (isNaN(percentage)) {
            return '';
          }
          
          return percentage.toFixed(1) + '%';
        },
        // You can also add `anchor` and `align` for label positioning
        anchor: 'center',
        align: 'center',
      },
    },
  };

  if (!chartData) return <div className="w-fit mx-auto">No data available.</div>;
  return (
    <Pie options={options} data={chartData} />
  );
}