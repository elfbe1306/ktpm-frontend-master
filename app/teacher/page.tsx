"use client";
import { BarChart } from "@/components/BarChart";
import { StudentTable } from "@/components/StudentTable";
import { FaBookReader } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { useState } from "react";

// --- 1. INTERFACES (Định nghĩa kiểu dữ liệu) ---
export interface Subject {
  code: string;
  name: string;
}

export interface StudentProficiency {
  id: number;
  name: string;
  avBT: number;
  avTest: number;
  avAs: number;
}

// --- 2. DỮ LIỆU CẤU HÌNH (Thêm : Record<string, ...> để sửa lỗi TypeScript) ---
export const SEMESTER_DATA: Record<string, Subject[]> = {
  "HK251": [
    { code: "251_SA3_CC01", name: "CC01_Kiến trúc phần mềm" },
    { code: "251_SA3_CN01", name: "CN01_Kiến trúc phần mềm" },
    { code: "251_SA3_L01", name: "L01_Kiến trúc phần mềm" },
    { code: "251_SE3_CC01", name: "CC01_Công nghệ phần mềm" },
    { code: "251_SE3_CN01", name: "CN01_Công nghệ phần mềm" },
    { code: "251_SE3_L01", name: "L01_Công nghệ phần mềm" }
  ],
  "HK243": [
    { code: "243_SE3_L01", name: "L01_Công nghệ phần mềm" }
  ],
  "HK242": [],
  "HK241": []
};

// Dữ liệu học sinh
export const STUDENTS_BY_SUBJECT: Record<string, StudentProficiency[]> = {
  "251_SA3_CC01": [
    { id: 1, name: "Nguyễn Văn A", avBT: 2.0, avTest: 5.0, avAs: 5.0 },
    { id: 2, name: "Trần Thị B", avBT: 2, avTest: 5.5, avAs: 6.0},
    { id: 3, name: "Phan Văn C", avBT: 2, avTest: 5.5, avAs: 1.0}
  ],
  "251_SA3_CN01": [
    { id: 4, name: "Lý Văn D", avBT: 2, avTest: 4.5, avAs: 2.0},
    { id: 5, name: "Trần Văn E", avBT: 2, avTest: 9.5, avAs: 6 }
  ],
  "251_SA3_L01": [
     { id: 6, name: "Phạm Văn E", avBT: 2.0, avTest: 1.2, avAs: 3.0}
  ],
  "251_SE3_CC01": [
     { id: 7, name: "Nguyễn Thị A", avBT: 2.0, avTest: 1.2, avAs: 3.0}
  ],
  "251_SE3_CN01": [
     { id: 8, name: "Phan Thị B", avBT: 2.0, avTest: 1.2, avAs: 3.0}
  ],
  "251_SE3_L01": [
     { id: 9, name: "Trần Văn Cao C", avBT: 2.0, avTest: 1.2, avAs: 3.0}
  ],
  "243_SE3_L01": [
     { id: 10, name: "Phạm Văn Hoàng ", avBT: 2.0, avTest: 1.2, avAs: 3.0}
  ],
  "DEFAULT": []
};

// Dữ liệu biểu đồ
const CHART_DATA_BY_SEMESTER: Record<string, { categories: string[], series: { name: string, data: number[] }[] }> = {
  "HK251": {
    categories: ['CC01_Kiến trúc phần mềm', 'CN01_Kiến trúc phần mềm', 'L01_Kiến trúc phần mềm', 'CC01_Công nghệ phần mềm', 'CN01_Công nghệ phần mềm', 'L01_Công nghệ phần mềm'],
    series: [
      { name: 'Điểm >=8', data: [30, 50, 60, 50, 60, 80] },
      { name: 'Điểm <4', data: [10, 5, 2, 8, 3, 5] },
    ]
  },
  "HK243": {
    categories: ['L01_Công nghệ phần mềm'],
    series: [
      { name: 'Điểm >=8', data: [30] },
      { name: 'Điểm <4', data: [5] },
    ]
  },
  "HK242": { categories: [], series: [] },
  "HK241": { categories: [], series: [] }
};

export default function TeacherHomePage() {
  
  // State cho Bảng học sinh
  const [selectedSemester, setSelectedSemester] = useState<string>("HK251");
  const [selectedSubject, setSelectedSubject] = useState<string>("251_SA3_CC01");

  // ---  KHAI BÁO THIẾU STATE CHO BIỂU ĐỒ ---
  const [chartSemester, setChartSemester] = useState<string>("HK251");

  // Lấy dữ liệu an toàn
  const currentSubjects = SEMESTER_DATA[selectedSemester] || [];
  const currentStudentList = STUDENTS_BY_SUBJECT[selectedSubject] || [];
  
  // Lấy dữ liệu Chart dựa trên chartSemester (độc lập với bảng)
  const currentChartData = CHART_DATA_BY_SEMESTER[chartSemester] || { categories: [], series: [] };

  // --- THÊM KIỂU CHO EVENT ---
  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSemester = event.target.value;
      setSelectedSemester(newSemester);
      
      // Logic tự động chọn môn đầu tiên khi đổi kỳ
      const subjectsInNewSemester = SEMESTER_DATA[newSemester] || [];
      if (subjectsInNewSemester.length > 0) {
          setSelectedSubject(subjectsInNewSemester[0].code);
      } else {
          setSelectedSubject(""); 
      }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSubject(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 font-display">Bảng điều khiển</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-3 xl:col-span-4 flex flex-row justify-between gap-6">
            <div className="bg-white p-4 w-150 rounded-lg shadow-md flex flex-col items-start space-y-2 border border-gray-100">
                <div className="p-3 rounded-xl bg-purple-200 text-purple-700">
                  <FaBookReader size={25}/>
                </div>
                <p className="text-sm text-gray-500 font-display">Tổng số khóa học</p>
                <p className="text-xl font-bold text-gray-800">7</p>
                </div>

                <div className="bg-white p-4 w-150 rounded-lg shadow-md flex flex-col items-start space-y-2 border border-gray-100">
                <div className="p-3 rounded-xl bg-cyan-200 text-cyan-700">
                  <BsPeopleFill size={25}/>
                </div>
                <p className="text-sm text-gray-500 font-display">Tổng số học sinh</p>
                <p className="text-xl font-bold text-gray-800">183.000</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />
        <div className="grid grid-cols-1 gap-6">
          <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            
            {/* --- DROPDOWN CHỌN KỲ CHO BIỂU ĐỒ --- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Số lượng học sinh yếu và giỏi theo từng khóa học</h2>
              
              <div className="flex items-center gap-2">
                  <select 
                    value={chartSemester}
                    onChange={(e) => setChartSemester(e.target.value)}
                    className="g-white text-sm font-display p-1 cursor-pointer"
                  >
                    {Object.keys(SEMESTER_DATA).map((hk) => (
                        <option key={hk} value={hk}>{hk}</option>
                    ))}
                  </select>
              </div>
            </div>
            
            <BarChart 
                categories={currentChartData.categories} 
                series={currentChartData.series} 
            />

          </div>
        </div>

        {/* Bảng học sinh (Dùng state riêng selectedSemester) */}
        <StudentTable 
            studentList={currentStudentList}
            semesters={Object.keys(SEMESTER_DATA)}
            subjects={currentSubjects}
            selectedSemester={selectedSemester}
            selectedSubject={selectedSubject}
            onSemesterChange={handleSemesterChange}
            onSubjectChange={handleSubjectChange}
        />

      </div>
    </div>
  )
}