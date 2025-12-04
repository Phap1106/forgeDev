export default function AdminDashboardPage() {
  const stats = {
    tools: 8,
    users: 124,
    revenue: 5_000_000,
    activeSubscriptions: 32,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <CardStat label="Tổng số tool" value={stats.tools.toString()} />
      <CardStat label="Tổng số người dùng" value={stats.users.toString()} />
      <CardStat
        label="Tổng doanh thu"
        value={stats.revenue.toLocaleString("vi-VN") + " ₫"}
      />
      <CardStat
        label="Gói thuê đang hoạt động"
        value={stats.activeSubscriptions.toString()}
      />
    </div>
  );
}

function CardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
