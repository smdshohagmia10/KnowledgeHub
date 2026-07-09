"use client";

import React, { useMemo } from "react";
import { Card, CardHeader, Separator } from "@heroui/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";

const PALETTE = {
  accent: "#6366F1",
  blue:   "#3B82F6",
  emerald: "#10B981",
  gray:    "#9CA3AF"
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboardChart({ paymentData = [], userData = [] }) {
  
  // ১. চার্ট ডেটা: Revenue by Book (Top 5)
  const revenueBarData = useMemo(() => {
    const bookMap = {};
    paymentData.forEach((item) => {
      const title = item.title || "Unknown Book";
      bookMap[title] = (bookMap[title] || 0) + Number(item.price || 0);
    });

    return Object.entries(bookMap)
      .map(([title, revenue]) => ({
        title: title.length > 12 ? title.slice(0, 10) + "…" : title,
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [paymentData]);

  // ২. চার্ট ডেটা: Monthly Revenue Trend
  const monthlyTimelineData = useMemo(() => {
    const trendMap = {};
    paymentData.forEach((item) => {
      const date = item.createdAt ? new Date(item.createdAt) : new Date();
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;
      trendMap[yearMonth] = (trendMap[yearMonth] || 0) + Number(item.price || 0);
    });

    return Object.entries(trendMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, revenue]) => {
        const [year, month] = key.split("-");
        return {
          month: `${MONTH_NAMES[Number(month)]} ${year.slice(2)}`,
          revenue,
        };
      });
  }, [paymentData]);

  // ৩. চার্ট ডেটা: Users Role Ratio (Pie Chart)
  const userRoleData = useMemo(() => {
    let adminCount = 0;
    let userCount = 0;
    
    userData.forEach(user => {
      if (user.role === 'admin') adminCount++;
      else userCount++;
    });

    return [
      { name: "Users", value: userCount || 1 },
      { name: "Admins", value: adminCount || 0 }
    ];
  }, [userData]);

  const customTooltipStyle = {
    borderRadius: "8px",
    border: "1px solid #e4e4e7",
    fontSize: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  };

  return (
    <div className="space-y-6">
      
      {/* Top 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Revenue by Book */}
        <Card className="shadow-sm border border-default-100 ">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
              <FaChartBar size={16} />
            </div>
            <div className="text-center">
              <p className="text-tiny uppercase font-semibold text-default-400 tracking-wider">Analytics</p>
              <h4 className="font-bold text-default-700 text-base">Top Books Revenue ($)</h4>
            </div>
          </CardHeader>
          <Separator />
          <div className="p-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueBarData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                <XAxis dataKey="title" tick={{ fontSize: 11, fill: "#71717a" }} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => `৳${v}`} />
                <Tooltip contentStyle={customTooltipStyle} formatter={(v) => [`৳${v}`, "Revenue"]} />
                <Bar dataKey="revenue" fill={PALETTE.accent} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Area Chart: Monthly Trend */}
        <Card className="shadow-sm border border-default-100 ">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <FaChartLine size={16} />
            </div>
            <div className="text-center">
              <p className="text-tiny uppercase font-semibold text-default-400 tracking-wider">Trends</p>
              <h4 className="font-bold text-default-700 text-base">Monthly Revenue Progress</h4>
            </div>
          </CardHeader>
          <Separator />
          <div className="p-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PALETTE.blue} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={PALETTE.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => `৳${v}`} />
                <Tooltip contentStyle={customTooltipStyle} formatter={(v) => [`৳${v}`, "Revenue"]} />
                <Area
                  type="monotone" dataKey="revenue" stroke={PALETTE.blue} strokeWidth={2}
                  fill="url(#dashboardGrad)" dot={{ r: 3, fill: PALETTE.blue }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. Bottom User Distribution Chart */}
      <Card className="shadow-sm border border-default-100  max-w-md">
         <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
              <FaChartPie size={16} />
            </div>
            <div className="text-center">
              <p className="text-tiny uppercase font-semibold text-default-400 tracking-wider">Demographics</p>
              <h4 className="font-bold text-default-700 text-base">User Accounts Ratio</h4>
            </div>
          </CardHeader>
          <Separator />
          <div className="p-4 flex justify-center items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userRoleData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} 
                  paddingAngle={5} dataKey="value"
                >
                  <Cell fill={PALETTE.blue} />
                  <Cell fill={PALETTE.emerald} />
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
      </Card>

    </div>
  );
}