import React from 'react';
import { allTranjections } from "@/lib/apis/allTranjections";
import { allReviews } from "@/lib/apis/reviews";
import { allUser } from "@/lib/apis/users";

import { Card,  Chip } from "@heroui/react";
import { 
    FaUsers, FaClock, 
    FaMoneyBillWave, FaShoppingCart, FaHistory, FaStar 
} from "react-icons/fa";
import AdminDashboardChart from '@/components/dashboard/admin/AdminDashBoardChart';

const AdminDashboardPage = async () => {

    const [allReview, allPayments, allUsers] = await Promise.all([
        allReviews().catch(() => []),
        allTranjections().catch(() => []),
        allUser().catch(() => [])
    ]);

    const totalRevenue = allPayments?.reduce((sum, item) => sum + Number(item.price || item.amount || 0), 0) || 0;
    
    const stats = [
        { title: "Total Users", count: allUsers?.length || 0, icon: <FaUsers />, color: "bg-blue-500/10 text-blue-600" },
        { title: "Total Revenue", count: `$${totalRevenue}`, icon: <FaMoneyBillWave />, color: "bg-emerald-500/10 text-emerald-600" },
        { title: "Total Orders", count: allPayments?.length || 0, icon: <FaShoppingCart />, color: "bg-indigo-500/10 text-indigo-600" },
        { title: "Total Reviews", count: allReview?.length || 0, icon: <FaStar />, color: "bg-amber-500/10 text-amber-600" },
    ];

    const recentActivities = [
        { id: 1, user: "Lokman", action: "added a new book", time: "5 mins ago" },
        { id: 2, user: "Hasan", action: 'purchased "Atomic Habits"', time: "12 mins ago" },
        { id: 3, user: "Rahim", action: "became Librarian", time: "1 hr ago" },
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight ">
                    Welcome Back, Admin 👋
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Here is what's happening with your library today.
                </p>
            </div>

            {/* 1. Overview Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border border-gray-100 shadow-sm ">
                        <div className="flex flex-row items-center gap-4 p-5">
                            <div className={`p-3 rounded-xl text-xl ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-semibold  uppercase tracking-wider">
                                    {stat.title}
                                </p>
                                <h3 className="text-xl md:text-2xl font-bold  mt-0.5">
                                    {stat.count}
                                </h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* 2. Charts Section (Client Component) */}
            <AdminDashboardChart paymentData={allPayments} userData={allUsers} reviewData={allReview} />

            {/* 3. Bottom Section: Activities & Mini Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Activities (Timeline) */}
                <Card className="lg:col-span-1 border border-gray-100 shadow-sm ">
                    <div className="p-6 space-y-4">
                        <h3 className="font-bold  text-lg flex items-center gap-2">
                            <FaClock className="text-blue-500" /> Recent Activities
                        </h3>
                        <div className="relative border-l border-gray-100 pl-4 space-y-6 ml-2">
                            {recentActivities.map((act) => (
                                <div key={act.id} className="relative">
                                    {/* Timeline Dot */}
                                    <span className="absolute -left-[21px] mt-1 bg-blue-500 w-2.5 h-2.5 rounded-full ring-4 ring-white"></span>
                                    <div>
                                        <p className="text-sm ">
                                            <span className="font-semibold ">{act.user}</span> {act.action}
                                        </p>
                                        <span className="text-xs ">{act.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Latest Transactions Mini Table */}
                <Card className="lg:col-span-2 border border-gray-100 shadow-sm  overflow-hidden">
                    <div className="p-6 space-y-4">
                        <h3 className="font-bold  text-lg flex items-center gap-2">
                            <FaHistory className="text-indigo-500" /> Recent Transactions
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[450px]">
                                <thead>
                                    <tr className="border-b border-gray-50 text-xs font-semibold  uppercase tracking-wider pb-2">
                                        <th className="pb-3">User</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {allPayments?.slice(0, 4).map((pay, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 font-medium ">{pay.email || "Guest"}</td>
                                            <td className="py-3 font-semibold ">${pay.price || pay.amount || 0}</td>
                                            <td className="py-3 text-right">
                                                <Chip size="sm" variant="flat" color="success">Success</Chip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default AdminDashboardPage;