import React from 'react';
import AllUsersTable from '@/components/dashboard/admin/AllUsersTable';
import { allUser } from '@/lib/apis/users';
import { FaUsers, FaUserPlus, FaSearch } from 'react-icons/fa';
import { Button, Input } from '@heroui/react';

const UsersPage = async () => {
    // সার্ভার সাইড থেকে সব ইউজারের ডাটা ফেচ করা হচ্ছে
    const allUsers = await allUser();

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight  flex items-center gap-2">
                        <FaUsers className="text-blue-600 text-xl md:text-2xl" />
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage user accounts, monitor system roles, and adjust permissions.
                    </p>
                </div>

                {/* Add New User Button */}
                <Button 
                    color="primary" 
                    startContent={<FaUserPlus className="text-xs" />}
                    className="bg-blue-600 text-white shadow-sm hover:bg-blue-700 w-full sm:w-auto"
                >
                    Add User
                </Button>
            </div>

            {/* Utility Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm font-medium text-gray-600">
                    Total Registered Users: <span className="text-blue-600 font-bold">{allUsers?.length || 0}</span>
                </div>
                
            </div>

            {/* Table Container */}
            <div className=" rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <AllUsersTable allUsers={allUsers} />
            </div>
        </div>
    );
};

export default UsersPage;