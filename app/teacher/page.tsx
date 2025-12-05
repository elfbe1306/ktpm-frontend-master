
import {BarChart} from "@/components/BarChart"
import { MdTask } from "react-icons/md";
import { BsFillAlarmFill } from "react-icons/bs";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
export default function TeacherHomePage() {
    
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
              <h2 className="text-xl font-semibold text-gray-800">Số lượng học sinh có điểm trung bình giỏi và yếu theo từng khóa học</h2>
              <svg className="w-6 h-6 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Bar Chart Area */}
            <BarChart/>
          </div>

          {/* Recent Activities (Right Column) */}
          <div className="xl:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Hoạt động gần đây</h2>

            {/* Act 1 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                <div className="p-3 rounded-full bg-green-01">
                  <MdTask size={24} color="white" />
                </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Bài tập số 1</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

            {/* Act 2 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                <div className="p-3 rounded-full bg-orange-01">
                  <BsFillAlarmFill size={24} color="white" />
                </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Bài kiểm tra số 1</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

            {/* Act 3 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                <div className="p-3 rounded-full bg-red-01">
                  <BsFillFileEarmarkArrowUpFill size={24} color="white" />
                </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Bài tập lớn 1</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

            {/* Act 4 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <BiSolidFilePdf size={50} color="F1351B"/>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Chương 3</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

            {/* Act 5 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <BiSolidFilePdf size={50} color="F1351B"/>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Chương 2</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

            {/* Act 6 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <BiSolidFilePdf size={50} color="F1351B"/>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Chương 1</p>
                <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    )
}