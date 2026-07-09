import React from 'react';
import PendingBooksTable from '@/components/dashboard/admin/PendingBooksTable';
import { getPendingBooks } from '@/lib/apis/books';
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';

const BookApprovalPage = async () => {

    const pendingBooks = await getPendingBooks();
    
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight  flex items-center gap-2">
                        <FaBookOpen className="text-blue-600 text-xl md:text-2xl" />
                        Book Approval Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Review, approve, or reject newly submitted books from authors.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200 w-fit">
                    <span className="w-2 height-2 rounded-full bg-amber-500 animate-pulse"></span>
                    {pendingBooks?.length || 0} Books Pending
                </div>
            </div>

            {/* Table Container */}
            <div className=" rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <PendingBooksTable pendingBooks={pendingBooks} />
            </div>
        </div>
    );
};

export default BookApprovalPage;