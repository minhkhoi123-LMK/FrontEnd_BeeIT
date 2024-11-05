import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard: React.FC = () => {

    /* bieu do tron do 1 */
    const projectOFthang = {
        datasets: [
            {
                data: [58, 42], // Phần trăm hoàn thành (58%) và còn lại (42%)
                backgroundColor: ['#FF6384', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };


    /* bieu do tron xanh  2*/
    const projectOFnam = {
        datasets: [
            {
                data: [32, 68], // Tăng trưởng phần trăm (32%) và còn lại (68%)
                backgroundColor: ['#4CAF50', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };
    const customerOFthang = {
        datasets: [
            {
                data: [58, 42], // Phần trăm hoàn thành (58%) và còn lại (42%)
                backgroundColor: ['#FF6384', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };


    /* bieu do tron xanh  2*/
    const customerOFnam = {
        datasets: [
            {
                data: [32, 68], // Tăng trưởng phần trăm (32%) và còn lại (68%)
                backgroundColor: ['#4CAF50', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    const dailySalesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Daily Sales',
                data: [30, 60, 70, 80, 90, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    const salesAnalysisData = {
        labels: ['2011', '2012', '2013', '2014', '2015'],
        datasets: [
            {
                label: 'Sales',
                data: [40, 55, 65, 50, 80],
                backgroundColor: '#4BC0C0',
            },
        ],
    };


    const statisticsData = {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        datasets: [
            {
                label: 'Growth',
                data: [30, 45, 40, 60, 70, 50, 75],
                borderColor: '#FFCE56',
                fill: false,
            },
        ],
    };

    return (
        <div className="flex flex-col p-8  min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">THỐNG KÊ</h1>


            <div className="grid grid-cols-4 gap-6 mb-8">
                {/* Tổng dự án trong tháng */}
                <div className="col-span-1 bg-white rounded-lg shadow p-4 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Tổng dự án trong tháng</h2>
                        <p className="text-3xl font-bold">256</p>
                        {/*   <p className="text-gray-600">Khách hàng tháng này</p>*/}
                    </div>
                    <div className="w-16 h-16">
                        <Doughnut data={projectOFthang} options={{cutout: '80%'}}/>
                    </div>
                </div>

                {/* Tổng dự án trong năm */}
                <div className="col-span-1 bg-white rounded-lg shadow p-4 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Tổng dự án trong năm</h2>
                        <p className="text-3xl font-bold">8451</p>
                        {/* <p className="text-gray-600">Khách hàng ngày này</p>*/}
                    </div>
                    <div className="w-16 h-16">
                        <Doughnut data={projectOFnam} options={{cutout: '80%'}}/>
                    </div>
                </div>

                {/* Tổng khách hàng trong tháng */}
                <div className="col-span-1 bg-white rounded-lg shadow p-4 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Tổng khách hàng trong tháng</h2>
                        <p className="text-3xl font-bold">4569</p>
                        {/* <p className="text-gray-600">Dự án tháng này</p>*/}
                    </div>
                    <div className="w-16 h-16">
                        <Doughnut data={customerOFthang} options={{cutout: '80%'}}/>
                    </div>
                </div>

                {/* Tổng khách hàng trong năm */}
                <div className="col-span-1 bg-white rounded-lg shadow p-4 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Tổng khách hàng trong năm</h2>
                        <p className="text-3xl font-bold">158</p>
                        {/*  <p className="text-gray-600">Dự án năm này</p>*/}
                    </div>
                    <div className="w-16 h-16">
                        <Doughnut data={customerOFnam} options={{cutout: '80%'}}/>
                    </div>
                </div>
            </div>


            {/* Sales and Statistics Charts */}
            <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Phân tích bán hàng</h2>
                    <Bar data={salesAnalysisData}/>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Thống kê</h2>
                    <Line data={statisticsData}/>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Bán hàng hàng ngày</h2>
                    <Doughnut data={dailySalesData}/>
                </div>
            </div>

            {/* Recent Projects and New Table Container */}
            <div className="flex gap-8 mb-8">
                {/* Recent Projects Table */}
                <div className="bg-white rounded-lg shadow-md p-6 w-1/2">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Dự án mới nhất</h2>
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Tên dự án</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Ngày bắt đầu</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Ngày kết thúc</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Chủ dự Án</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án 1</td>
                            <td className="py-3 px-4 border-b">01/01/2017</td>
                            <td className="py-3 px-4 border-b">26/04/2017</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-red-500">Phát hành</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án 2</td>
                            <td className="py-3 px-4 border-b">01/01/2017</td>
                            <td className="py-3 px-4 border-b">31/05/2017</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-green-500">Hoàn tất</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án 3</td>
                            <td className="py-3 px-4 border-b">01/01/2017</td>
                            <td className="py-3 px-4 border-b">31/05/2017</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-yellow-500">Công việc đang tiến hành</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* New Table (next to the previous table) */}
                <div className="bg-white rounded-lg shadow-md p-6 w-1/2">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Bảng khách hàng hoac bảng gi do</h2>
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Mã dự án</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Ngày bắt đầu</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Ngày kết thúc</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Chủ dự Án</th>
                            <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án A</td>
                            <td className="py-3 px-4 border-b">02/02/2023</td>
                            <td className="py-3 px-4 border-b">12/12/2023</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-green-500">Hoàn tất</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án B</td>
                            <td className="py-3 px-4 border-b">05/06/2023</td>
                            <td className="py-3 px-4 border-b">01/09/2023</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-yellow-500">Đang tiến hành</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">Dự Án C</td>
                            <td className="py-3 px-4 border-b">10/07/2023</td>
                            <td className="py-3 px-4 border-b">25/11/2023</td>
                            <td className="py-3 px-4 border-b">Minh Nhật Lỏ</td>
                            <td className="py-3 px-4 border-b text-red-500">Phát hành</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
