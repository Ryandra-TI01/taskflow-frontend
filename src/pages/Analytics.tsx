import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type AnalyticsData = {
  status: {
    completed: number;
    uncompleted: number;
  };
  average_per_day: number;
  growth: { date: string; count: number }[];
  deadlines: { date: string; count: number }[];
  task_per_month: { month: string; count: number }[];
};

const COLORS = ["#10B981", "#EF4444"]; // green for completed, red for uncompleted

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const { token } = useAuth();
  const { analyticsQuery } = useTasks(token);
  useEffect(() => {
    if (analyticsQuery.data) {
      setData(analyticsQuery.data);
    }
  }, [analyticsQuery.data]);


  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* --- Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsStatCard title="Completed" value={data.status.completed} />
        <AnalyticsStatCard title="Uncompleted" value={data.status.uncompleted} />
        <AnalyticsStatCard
          title="Avg. Tasks / Day"
          value={data.average_per_day.toFixed(2)}
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.growth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs fill-muted-foreground" tick={{ fill: 'currentColor' }} />
                <YAxis className="text-xs fill-muted-foreground" tick={{ fill: 'currentColor' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Completed", value: data.status.completed },
                    { name: "Uncompleted", value: data.status.uncompleted },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={4}
                >
                  {COLORS.map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Tasks Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks Per Month</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.task_per_month}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs fill-muted-foreground" tick={{ fill: 'currentColor' }} />
              <YAxis className="text-xs fill-muted-foreground" tick={{ fill: 'currentColor' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))' }}
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsStatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <span className="text-3xl font-bold tracking-tight mt-2 block">
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
