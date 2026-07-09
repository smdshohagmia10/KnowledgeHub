import React from 'react';
import { userSession } from '@/lib/core/session';
import { Card, Avatar, Button, Chip } from '@heroui/react';
import { FaUserShield, FaEnvelope, FaCalendarAlt, FaEdit, FaLock, FaKey } from 'react-icons/fa';
import Image from 'next/image';

const ProfilePage = async () => {
    const admin = await userSession();

    const adminData = {
        name: admin?.name || "Admin User",
        email: admin?.email || "admin@example.com",
        role: admin?.role || "System Administrator",
        avatar: admin?.image,
        joinedDate: admin?.joinedDate || "January 2026",
        status: admin?.status || "Active"
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            
            {/* Profile Overview Card */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden ">
                {/* Decorative Top Banner */}
                <div className="h-32 w-full bg-linear-to-r from-blue-600 to-indigo-700"></div>
                
                <div className="relative pb-8 px-4 sm:px-8">
                    {/* Avatar (Brings upward into the banner) */}
                    <div className="absolute -top-16 left-4 sm:left-8">
                        <Image
                            src={adminData.avatar}
                            alt={adminData.name}
                            width={200}
                            height={200}
                            className="w-28 h-28 text-2xl border-4 border-white shadow-md bg-blue-100 text-blue-700"
                            radius="full"
                        />
                    </div>

                    {/* Profile Header Details */}
                    <div className="pt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl font-bold ">{adminData.name}</h1>
                                <Chip size="sm" color="success" variant="flat" className="font-medium">
                                    {adminData.status}
                                </Chip>
                            </div>
                            <p className="text-sm font-medium text-blue-600 flex items-center gap-1.5 mt-1">
                                <FaUserShield />
                                {adminData.role}
                            </p>
                        </div>
                        
                        <Button 
                            color="primary" 
                            variant="flat"
                            startContent={<FaEdit size={14} />}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm self-start sm:self-auto"
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Account Details */}
                <div className="md:col-span-2  rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold border-b  pb-2">
                        Account Information
                    </h2>
                    
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-3 ">
                            <div className="p-2 rounded-lg ">
                                <FaEnvelope size={16} />
                            </div>
                            <div>
                                <p className="text-xs  font-medium">Email Address</p>
                                <p className="text-sm font-semibold text-gray-800">{adminData.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 ">
                            <div className="p-2  rounded-lg ">
                                <FaCalendarAlt size={16} />
                            </div>
                            <div>
                                <p className="text-xs  font-medium">Joined Since</p>
                                <p className="text-sm font-semibold text-gray-800">{adminData.joinedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Security Actions */}
                <div className=" rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold  border-b pb-2">
                        Security
                    </h2>
                    
                    <div className="space-y-2 pt-2">
                        <Button 
                            fullWidth
                            variant="light"
                            startContent={<FaLock className=" text-xs" />}
                            className="justify-start text-gray-700 font-medium text-sm hover:bg-gray-50"
                        >
                            Change Password
                        </Button>
                        <Button 
                            fullWidth
                            variant="light"
                            startContent={<FaKey className=" text-xs" />}
                            className="justify-start text-gray-700 font-medium text-sm hover:bg-gray-50"
                        >
                            Two-Factor Auth (2FA)
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ProfilePage;