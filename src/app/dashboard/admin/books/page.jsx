import React from 'react';
import AllBooksTable from '@/components/dashboard/admin/AllBooksTable';
import { allBooksManupuletion } from '@/lib/apis/books'; // আপনার প্রজেক্টের API নাম অনুযায়ী রাখা হলো
import { FaBoxes, FaPlus, FaSearch } from 'react-icons/fa';
import { Button, Input } from '@heroui/react';

const BooksPage = async () => {
    // সার্ভার সাইড থেকে সব বইয়ের ডাটা ফেচ করা হচ্ছে
    const allBooks = await allBooksManupuletion();

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
           
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight  flex items-center gap-2">
                        <FaBoxes className="text-blue-600 text-xl md:text-2xl" />
                        Book Inventory Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View, update, delete, and monitor all the books available in your system.
                    </p>
                </div>

                

            {/* Utility Bar (Search & Total Counter) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm font-medium text-gray-600">
                    Total Books: <span className="text-blue-600 font-bold">{allBooks?.length || 0}</span>
                </div>
                
            </div>

            {/* Table Container */}
            <div className=" rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <AllBooksTable allBooks={allBooks} />
            </div>
        </div>
    );
};

export default BooksPage;