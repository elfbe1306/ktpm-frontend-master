'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 1. Định nghĩa kiểu dữ liệu Props nhận vào
interface BarChartProps {
  categories: string[]; // Tên các môn học nằm dưới trục X
  series: {
    name: string;
    data: number[];
  }[]; // Dữ liệu cột
}

export function BarChart({ categories, series }: BarChartProps) {
  
  const ChartColors =['#1A56DB', '#F97316'];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
    },
    colors: ChartColors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 0,
        borderRadiusApplication: 'end',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " học sinh";
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 0, colors: ['transparent'] },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: 0 },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right', 
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      itemMargin: { horizontal: 10, vertical: 0 }
    },
    xaxis: {
      // 2. Sử dụng categories từ Props
      categories: categories, 
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: true },
    fill: { opacity: 1 },
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
      <div id="column-chart">
         {/* 3. Truyền options và series vào Chart */}
         <ReactApexChart 
            options={options} 
            series={series} 
            type="bar" 
            height={400} 
         />
      </div>
    </div>
  );
};