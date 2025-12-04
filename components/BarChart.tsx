'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts'; // Import type cho options

// Import dynamic để tắt SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function BarChart() {
  
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    grid: {
      show: false,
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
      show: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      show: false,
    },
    fill: {
      opacity: 1,
      colors: ['#1A56DB'],
    },
  };

  // Định nghĩa dữ liệu
  const series = [
    {
      name: 'Leads',
      data: [150, 141, 145, 152, 135, 125, 160],
    },
  ];

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
      
      {/* Header Section */}
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center me-3">
            <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
            </svg>
          </div>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
            42.5%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">Money spent:</dt>
          <dd className="leading-none text-xl font-bold text-gray-900">$3,232</dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">Conversion:</dt>
          <dd className="leading-none text-xl font-bold text-gray-900">1.2%</dd>
        </dl>
      </div>

      {/* APEX CHART AREA */}
      <div id="column-chart">
         <ReactApexChart 
            options={options} 
            series={series} 
            type="bar" 
            height={180} 
         />
      </div>

      {/* Footer / Actions */}
      <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between mt-5">
        <div className="flex justify-between items-center pt-5">
          {/* Dropdown Button */}
          <button
            className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
            type="button"
          >
            Last 7 days
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          
          {/* Report Link */}
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-100 px-3 py-2"
          >
            Leads Report
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
