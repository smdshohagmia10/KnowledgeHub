import BooksTable from '@/components/dashboard/user/BooksdeteisTable';
import { userReadedBooks } from '@/lib/apis/userBooks';
import React from 'react';

const ReadingListPage = async () => {
    const books = await userReadedBooks()
    console.log(books)
    return (
        <div className='p-6 mx-auto space-y-6'> 
            <h1 className='text-2xl font-bold text-orange-400'>My Readed Books</h1>
            <BooksTable books={books}></BooksTable>
        </div>
    );
};

export default ReadingListPage;