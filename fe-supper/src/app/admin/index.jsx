import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function DashboardPage() {
  const [stats, setStats] = useState({ tools: 0, users: 0, revenue: 0 });

  useEffect(() => {
    // Giả lập gọi API lấy thống kê
    // (Trong thực tế, sẽ gọi API backend để lấy số liệu thật)
    setTimeout(() => {
      // Set some dummy stats
      setStats({ tools: 8, users: 124, revenue: 5000000 });
    }, 500);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600 text-sm font-medium">Tổng số Tool</h2>
          <p className="mt-2 text-2xl font-semibold">{stats.tools}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600 text-sm font-medium">Tổng số Người dùng</h2>
          <p className="mt-2 text-2xl font-semibold">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600 text-sm font-medium">Tổng doanh thu</h2>
          <p className="mt-2 text-2xl font-semibold">{stats.revenue.toLocaleString('vi-VN')} ₫</p>
        </div>
      </div>
    </AdminLayout>
  );
}
