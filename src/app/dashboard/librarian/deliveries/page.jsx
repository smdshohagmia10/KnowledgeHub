import DeliveriesTable from "@/components/dashboard/librarian/DeliveriesTable";
import { approveDelevari } from "@/lib/apis/delevary";


const BorrowingsPage = async () => {
  const payments = await approveDelevari();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deliveries</h1>
        <p className="text-sm text-muted mt-1">
          Manage and confirm book deliveries
        </p>
      </div>

      {payments?.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg font-medium">No deliveries yet</p>
          <p className="text-sm mt-1">
            Deliveries will appear here once orders are placed.
          </p>
        </div>
      ) : (
        <DeliveriesTable payments={payments} />
      )}
    </div>
  );
};

export default BorrowingsPage;