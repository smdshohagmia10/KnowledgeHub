
import { FaHistory, FaDownload, FaFilter } from 'react-icons/fa';
import { Button } from '@heroui/react'; 
import TranjectionsTable from '@/components/dashboard/admin/TranjectionsTable';
import { allTranjections } from '@/lib/apis/allTranjections';

const TransactionsPage = async () => {
    const allPayments = await allTranjections();

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight  flex items-center gap-2">
                        <FaHistory className="text-blue-600 text-xl md:text-2xl" />
                        Transaction History
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor, review, and manage all incoming and outgoing client payments.
                    </p>
                </div>
                
                
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <TranjectionsTable allPayments={allPayments} />
            </div>
        </div>
    );
};

export default TransactionsPage;