import { MdTask } from "react-icons/md";
import { BsFillAlarmFill } from "react-icons/bs";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import { BiSolidFilePdf } from "react-icons/bi";

export const RecentActivities = () => {
  return (
    <div className="xl:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Hoạt động gần đây</h2>

      <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <div className="p-3 rounded-full bg-green-01 text-white">
          <MdTask size={24} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">Bài tập số 1</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <div className="p-3 rounded-full bg-orange-01 text-white">
          <BsFillAlarmFill size={24} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">Bài kiểm tra số 1</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <div className="p-3 rounded-full bg-red-01 text-white">
          <BsFillFileEarmarkArrowUpFill size={24} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">Bài tập lớn 1</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <BiSolidFilePdf size={50} color="#dc2626" />
        <div className="flex-1">
          <p className="font-medium text-gray-800">Chương 3</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>
      
       <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <BiSolidFilePdf size={50} color="#dc2626" />
        <div className="flex-1">
          <p className="font-medium text-gray-800">Chương 2</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>

       <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
        <BiSolidFilePdf size={50} color="#dc2626" />
        <div className="flex-1">
          <p className="font-medium text-gray-800">Chương 1</p>
          <p className="text-sm text-gray-500">Kiến trúc phần mềm</p>
        </div>
      </div>
    </div>
  );
};