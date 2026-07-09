import BookGrid from '@/components/browse/BookGrid';
import { getAllBooks } from '@/lib/apis/books';
import React from 'react';
export const dynamic = 'force-dynamic'; 

const BrowsePage =async ({searchParams}) => {
    const searchQuery = await searchParams
    const sp= new URLSearchParams(searchQuery)
    const quary = sp.toString()
    const {books ,total} = await getAllBooks(quary)

    return (
        <div>
            <BookGrid books={books} total={total}></BookGrid>
        </div>
    );
};

export default BrowsePage;