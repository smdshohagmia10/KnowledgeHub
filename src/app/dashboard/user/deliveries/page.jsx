
import BooksdeteisTable from "@/components/dashboard/user/BooksdeteisTable";
import { nonDelevaredBook } from "@/lib/apis/userBooks";


const DeliveriesPage = async () => {
  const books = await nonDelevaredBook();

  return (
    <div className="p-6 mx-auto space-y-6">
     <h1 className="text-2xl font-bold text-orange-400">Your Delevaries</h1>
      {/* Table */}
      <BooksdeteisTable books={books} />
    </div>
  );
};

export default DeliveriesPage;