import React from 'react';

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
    const calculateStatus = (s: StudentProficiency) => {
        // Tính trung bình cộng 3 cột
        const avg = (s.avBT + s.avTest + s.avAs) / 3;
        
        // Logic xếp loại
        if (avg < 4) {
        return { label: "Yếu", colorClass: "text-red-600 font-display" };
        } else if (avg >= 4 && avg < 7) {
        return { label: "Trung bình", colorClass: "text-orange-500 font-display" };
        } else if (avg >= 7 && avg < 8) {
        return { label: "Khá", colorClass: "text-yellow-600 font-display" };
        } else { // >= 8 và <= 10
        return { label: "Giỏi", colorClass: "text-green-600 font-display" };
        }
    };
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Đánh giá học sinh</h2>

        <div className="flex flex-row gap-3 w-full md:w-auto">
          {/* Dropdown Học Kỳ */}
          <select
            value={selectedSemester}
            onChange={onSemesterChange}
            className="bg-white text-sm font-display p-1 cursor-pointer"
          >
            {semesters.map((hk) => (
              <option key={hk} value={hk}>{hk}</option>
            ))}
          </select>

          {/* Dropdown Môn Học */}
          <select
            value={selectedSubject}
            onChange={onSubjectChange}
            className="bg-white text-sm font-display p-1 cursor-pointer"
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
        <div className="col-span-2">Điểm trung bình bài tập lớn</div>
        <div className="col-span-2">Tình trạng</div>
      </div>

{/* Table Body */}
      <div className="space-y-0 min-w-[800px]">
        {studentList.length > 0 ? (
          studentList.map((student) => {
            // Gọi hàm tính toán trạng thái cho từng học sinh
            const status = calculateStatus(student);

            return (
              <div
                key={student.id}
                className="grid grid-cols-12 gap-4 items-center p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Name & Avatar */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-200 shadow-sm">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-medium font-display text-gray-700">{student.name}</span>
                </div>

                {/* Điểm avBT */}
                <div className="col-span-2 flex justify-center font-display">
                    {student.avBT}
                </div>

                {/* Điểm avTest */}
                <div className="col-span-3 flex justify-center font-display">
                    {student.avTest}
                </div>

                {/* Điểm avAs */}
                <div className="col-span-2 flex justify-center font-display">
                    {student.avAs}
                </div>

                {/* Tình trạng (Status) */}
                <div className="col-span-2 flex justify-center">
                  <div className={`flex items-center justify-center font-bold rounded-lg px-4 py-2 text-sm  ${status.colorClass}`}>
                      {status.label}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500 italic">
            Chưa có dữ liệu thống kê cho môn học này.
          </div>
        )}
      </div>
    </div>
  );
};