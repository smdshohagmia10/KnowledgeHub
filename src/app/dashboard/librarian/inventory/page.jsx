import BooksTable from '@/components/dashboard/librarian/BookTable';
import { getBookInventory } from '@/lib/apis/library';
import { userSession } from '@/lib/core/session';


const BooksPage = async () => {
  const user = await userSession()

  const books = await getBookInventory(user?.id);
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold  mb-6">Book inventory</h1>
      <BooksTable books={books} />
    </div>
  );
};

export default BooksPage;