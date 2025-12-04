

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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <p className="text-sm text-gray-500 font-display">Tổng số khóa học</p>
                <p className="text-xl font-bold text-gray-800">112.000</p>
                </div>

                {/* Stat Card 2:*/}
                <div className="bg-white p-4 w-150 rounded-lg shadow-md flex flex-col items-start space-y-2 border border-gray-100">
                <div className="p-3 rounded-xl bg-cyan-200 text-cyan-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <p className="text-sm text-gray-500 font-display">Tổng số học sinh</p>
                <p className="text-xl font-bold text-gray-800">183.000</p>
                </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Main Content Area (Graph & Messages) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Profile Visit Chart (Left Column) */}
          <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Profile Visit</h2>
              <svg className="w-6 h-6 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Bar Chart Area */}
            <div className="h-80 relative">
              {/* Y-Axis Labels */}
              <div className="absolute inset-y-0 left-0 text-xs text-gray-500 w-8 flex flex-col justify-between py-1">
                <span>32</span>
                <span>24</span>
                <span>16</span>
                <span>8</span>
                <span>0</span>
              </div>

              {/* Chart Grid and Bars */}
              <div className="absolute inset-y-0 right-0 w-[calc(100%-3rem)] h-full grid grid-cols-12 gap-2 pb-6 px-1 items-end">
                {/* Jan */}
                <div className="bg-indigo-600 rounded-t-sm h-[25%]"></div>
                {/* Feb */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
                {/* Mar */}
                <div className="bg-indigo-600 rounded-t-sm h-[93.75%]"></div>
                {/* Apr */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
                {/* May */}
                <div className="bg-indigo-600 rounded-t-sm h-[31.25%]"></div>
                {/* Jun */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
                {/* Jul */}
                <div className="bg-indigo-600 rounded-t-sm h-[93.75%]"></div>
                {/* Aug */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
                {/* Sep */}
                <div className="bg-indigo-600 rounded-t-sm h-[31.25%]"></div>
                {/* Oct */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
                {/* Nov */}
                <div className="bg-indigo-600 rounded-t-sm h-[93.75%]"></div>
                {/* Dec */}
                <div className="bg-indigo-600 rounded-t-sm h-[62.5%]"></div>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 right-0 w-[calc(100%-3rem)] text-xs text-gray-500 grid grid-cols-12 gap-2 text-center pt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>

          {/* Recent Messages (Right Column) */}
          <div className="xl:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Messages</h2>

            {/* Message 1 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <img 
                className="w-10 h-10 rounded-full object-cover" 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Hank Schrader" 
              />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">Hank Schrader</p>
                <p className="text-sm text-gray-500">@johnducky</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>

            {/* Message 2 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <img 
                className="w-10 h-10 rounded-full object-cover" 
                src="https://i.pravatar.cc/150?img=25" 
                alt="Dean Winchester" 
              />
              <div>
                <p className="font-medium text-gray-800">Dean Winchester</p>
                <p className="text-sm text-gray-500">@imdean</p>
              </div>
            </div>

            {/* Message 3 */}
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
              <img 
                className="w-10 h-10 rounded-full object-cover" 
                src="https://i.pravatar.cc/150?img=42" 
                alt="John Dodol" 
              />
              <div>
                <p className="font-medium text-gray-800">John Dodol</p>
                <p className="text-sm text-gray-500">@dodoljohn</p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button className="w-full py-2 border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}