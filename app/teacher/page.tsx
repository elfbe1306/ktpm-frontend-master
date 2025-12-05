
"use client";
import {BarChart} from "@/components/BarChart";
import {RecentActivities} from "@/components/RecentActivities";
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
  workCompleted: string;
  averageScore: number;
  needingAttention: number;
  workingTowards: number;
  mastered: number;
  theme: "red" | "yellow" | "green";
}

export const SEMESTER_DATA: Record<string, Subject[]> = {
  "HK251": [
    { code: "SE104", name: "Kiến trúc phần mềm" },
    { code: "IT001", name: "Nhập môn lập trình" },
    { code: "SE121", name: "Đồ án 1" }
  ],
  "HK243": [
    { code: "IT002", name: "Lập trình hướng đối tượng" },
    { code: "MA003", name: "Đại số tuyến tính" }
  ],
  "HK242": [
    { code: "IT003", name: "Cấu trúc dữ liệu" }
  ],
  "HK241": []
};

export const STUDENTS_BY_SUBJECT: Record<string, StudentProficiency[]> = {
  "SE104": [
    { id: 1, name: "Nguyễn Văn A", workCompleted: "33 / 36", averageScore: 23, needingAttention: 45, workingTowards: 8, mastered: 7, theme: "red" },
    { id: 2, name: "Dante Podenzana", workCompleted: "31 / 36", averageScore: 53, needingAttention: 6, workingTowards: 35, mastered: 19, theme: "yellow" },
    { id: 3, name: "Susan Chan", workCompleted: "27 / 36", averageScore: 82, needingAttention: 1, workingTowards: 14, mastered: 45, theme: "green" }
  ],
  "IT001": [
    { id: 4, name: "John Doe", workCompleted: "10 / 36", averageScore: 45, needingAttention: 20, workingTowards: 10, mastered: 2, theme: "yellow" },
    { id: 5, name: "Alice Smith", workCompleted: "36 / 36", averageScore: 95, needingAttention: 0, workingTowards: 5, mastered: 50, theme: "green" }
  ],
  "IT002": [
     { id: 6, name: "Michael Brown", workCompleted: "15 / 30", averageScore: 12, needingAttention: 30, workingTowards: 2, mastered: 0, theme: "red" }
  ],
  "DEFAULT": []
};


export default function TeacherHomePage() {
    
  const [selectedSemester, setSelectedSemester] = useState<string>("HK251");
    // Mặc định chọn môn đầu tiên của HK251
  const [selectedSubject, setSelectedSubject] = useState<string>("SE104");

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
                <p className="text-xl font-bold text-gray-800">6</p>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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
          {/* Recent Activities (Right Column) */}
            <RecentActivities/>
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