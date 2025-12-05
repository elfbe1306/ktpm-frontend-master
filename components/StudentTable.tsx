import React from 'react';

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

interface ProficiencyTableProps {
  studentList: StudentProficiency[];
  // Dữ liệu cho Dropdown
  semesters: string[];
  subjects: Subject[];
  // State từ Parent
  selectedSemester: string;
  selectedSubject: string;
  // Handlers
  onSemesterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubjectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const StudentTable = ({
  studentList,
  semesters,
  subjects,
  selectedSemester,
  selectedSubject,
  onSemesterChange,
  onSubjectChange
}: ProficiencyTableProps) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Đánh giá học sinh</h2>

        <div className="flex flex-row gap-3 w-full md:w-auto">
          {/* Dropdown Học Kỳ */}
          <select
            value={selectedSemester}
            onChange={onSemesterChange}
            className="bg-white border border-gray-300 text-gray-700 text-sm font-display rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer"
          >
            {semesters.map((hk) => (
              <option key={hk} value={hk}>{hk}</option>
            ))}
          </select>

          {/* Dropdown Môn Học */}
          <select
            value={selectedSubject}
            onChange={onSubjectChange}
            className="bg-white border border-gray-300 text-gray-700 text-sm font-display rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer"
            disabled={subjects.length === 0}
          >
            {subjects.length > 0 ? (
              subjects.map((sub) => (
                <option key={sub.code} value={sub.code}>{sub.name}</option>
              ))
            ) : (
              <option>Không có môn học</option>
            )}
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="min-w-[800px] grid grid-cols-12 gap-4 text-xs font-semibold font-display text-gray-500 mb-4 px-4 text-center">
        <div className="col-span-3 text-left">Họ và tên</div>
        <div className="col-span-2">Điểm trung bình bài tập</div>
        <div className="col-span-3">Điểm trung bình bài kiểm tra</div>
        <div className="col-span-3">Điểm trung bình bài tập lớn</div>
        <div className="col-span-1">Tình trạng</div>
      </div>

      {/* Table Body */}
      <div className="space-y-3 min-w-[800px]">
        {studentList.length > 0 ? (
          studentList.map((student) => (
            <div
              key={student.id}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl ${
                student.theme === 'red' ? 'bg-red-50' :
                student.theme === 'yellow' ? 'bg-yellow-50' : 'bg-green-50'
              }`}
            >
              {/* Name & Avatar */}
              <div className="col-span-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                  student.theme === 'red' ? 'bg-red-300' :
                  student.theme === 'yellow' ? 'bg-yellow-400' : 'bg-green-300'
                }`}>
                  {student.name.charAt(0)}
                </div>
                <span className="font-medium font-display text-gray-700">{student.name}</span>
              </div>

              {/* Work Completed */}
              <div className="col-span-2 text-center font-semibold text-gray-600">
                {student.workCompleted}
              </div>

              {/* Average Score */}
              <div className="col-span-3 flex items-center justify-center gap-2">
                <div className={`h-10 w-12 rounded-lg ${
                  student.theme === 'red' ? 'bg-red-400' :
                  student.theme === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'
                }`}></div>
                <div className="bg-white px-3 py-2 rounded-lg shadow-sm font-bold text-gray-700 w-16 text-center">
                  {student.averageScore}%
                </div>
              </div>

              {/* Needing Attention */}
              <div className="col-span-2 flex justify-end pr-6">
                <div className={`flex items-center justify-center font-bold rounded-full ${
                    student.theme === 'red' 
                    ? 'w-14 h-14 bg-red-400 text-white text-lg shadow-md' 
                    : 'w-8 h-8 bg-red-200 text-red-700 text-xs mt-3'
                }`}>
                    {student.needingAttention}
                </div>
              </div>

              {/* Working Towards */}
              <div className="col-span-1 flex justify-center">
                <div className={`flex items-center justify-center font-bold rounded-full ${
                    student.theme === 'yellow' 
                    ? 'w-14 h-14 bg-yellow-400 text-white text-lg shadow-md' 
                    : 'w-10 h-10 bg-yellow-400 text-white text-sm mt-2'
                }`}>
                    {student.workingTowards}
                </div>
              </div>

              {/* Mastered */}
              <div className="col-span-1 flex justify-center">
                 <div className={`flex items-center justify-center font-bold rounded-full ${
                    student.theme === 'green' 
                    ? 'w-16 h-16 bg-green-500 text-white text-xl shadow-md -my-2' 
                    : 'w-10 h-10 bg-green-500 text-white text-sm mt-2'
                }`}>
                    {student.mastered}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 italic">
            Chưa có dữ liệu thống kê cho môn học này.
          </div>
        )}
      </div>
    </div>
  );
};