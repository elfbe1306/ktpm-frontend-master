'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts'; // Import type cho options

// Import dynamic để tắt SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function BarChart() {
  
  const ChartColors =['#1A56DB', '#F97316']
  // Định nghĩa kiểu dữ liệu cho options
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
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
          return val + " học sinh"; // Đơn vị khi hover
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1.5,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      // CHÚ THÍCH CÁC CỘT
      show: true,
      position: 'top',
      horizontalAlign: 'right', 
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      itemMargin: {
        horizontal: 10,
        vertical: 0
      }
    },
    xaxis: {
      categories: ['Kiến trúc phần mềm', 'Cơ sở dữ liệu', 'Mạng máy tính', 'Công nghệ phần mềm', 'Lập trình web', 'Hệ thống số'],
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };

  // Định nghĩa dữ liệu
const series = [
    {
      name: 'Điểm >=8', // Cột màu Vàng
      data: [44, 55, 57, 56, 61,80],
    },
    {
      name: 'Điểm <4', // Cột màu Cam
      data: [76, 85, 101, 98, 87,90],
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">

      {/* APEX CHART AREA */}
      <div id="column-chart">
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
