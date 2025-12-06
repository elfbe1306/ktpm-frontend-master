
"use client";
import {BarChart} from "@/components/BarChart";
import { StudentTable } from "@/components/StudentTable";
import { FaBookReader } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { useState } from "react";

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


export default function TeacherHomePage() {
    
  const [selectedSemester, setSelectedSemester] = useState<string>("HK251");
    // Mặc định chọn môn đầu tiên của HK251
  const [selectedSubject, setSelectedSubject] = useState<string>("251_SA3_CC01");

  const currentSubjects = SEMESTER_DATA[selectedSemester] || [];
    
    // Lấy danh sách học sinh dựa trên môn đang chọn
  const currentStudentList = STUDENTS_BY_SUBJECT[selectedSubject] || [];

    // Xử lý thay đổi Học kỳ
  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSemester = event.target.value;
      setSelectedSemester(newSemester);
        
        // Khi đổi học kỳ, tự động chọn môn đầu tiên
      const subjectsInNewSemester = SEMESTER_DATA[newSemester] || [];
      if (subjectsInNewSemester.length > 0) {
          setSelectedSubject(subjectsInNewSemester[0].code);
      } else {
          setSelectedSubject(""); 
      }
    };

    // Xử lý thay đổi Môn học
    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value);
    };

    return (
    <div className="bg-gray-100 p-8 min-h-screen font-sans">
      {/* Main Dashboard Container */}
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

                {/* Stat Card 2:*/}
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
        {/* Main Content Area (Graph & Activities) */}
        <div className="grid grid-cols-1 gap-6">
          {/* Bar Chart (Left Column) */}
          <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Số lượng học sinh có điểm trung bình giỏi và yếu theo từng môn học</h2>
              <svg className="w-6 h-6 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            {/* Bar Chart Area */}
            <BarChart/>
          </div>
        </div>

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