"use client"
import { publishBook, unpublishBook } from '@/lib/action/books';
import { Button, Table } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { BookDeleteAlart } from './BookDeleteAlart';

const AllBooksTable = ({ allBooks }) => {

  const router = useRouter();

  const handelPublish = async (id) => {
    try {
      const payload = { publishStatus: "published" };
      const res = await publishBook(payload, id);

      if (res) {
        toast.success("Your book has been published successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish book");
    }
  };

  const handelUnPublish = async (id) => {
    try {
      const payload = { publishStatus: "unpublished" };
      const res = await unpublishBook(payload, id);

      if (res) {
        toast.warning("Book unpublished successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to unpublish book");
    }
  };


    const headers = [
        "Cover",
        "Title", 
        "Author",
        "Category",
        "Publisher",
        "Price",
        "Date",
        "Approval Status",
        "Publish Status",
        "Actions",
    ];

    return (
        <Table aria-label="All Books Table">
            <Table.ScrollContainer>
                <Table.Content className="min-w-[1100px]">
                    
                    {/* TABLE HEAD */}
                    <Table.Header>
                        {headers.map((h) => (
                            <Table.Column isRowHeader key={h}>
                                {h}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    {/* TABLE BODY */}
                    <Table.Body emptyContent={"No books found"}>
                        {allBooks?.map((book) => {
                            const isPublished = book.publishStatus === "published";
                            const isPending = book.approvalStatus === "pending";

                            return (
                                <Table.Row key={book._id} id={book._id}>

                                    {/* Cover */}
                                    <Table.Cell>
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title}
                                            width={70}
                                            height={100}
                                            className="w-9 h-12 object-cover rounded border border-zinc-700"
                                        />
                                    </Table.Cell>

                                    {/* Title */}
                                    <Table.Cell>
                                        <div className="truncate max-w-[140px] font-medium">
                                            {book.title}
                                        </div>
                                    </Table.Cell>

                                    {/* Author */}
                                    <Table.Cell>
                                        <div className="truncate max-w-[120px]">
                                            {book.author}
                                        </div>
                                    </Table.Cell>

                                    {/* Category */}
                                    <Table.Cell>
                                        <span className="capitalize">{book.category}</span>
                                    </Table.Cell>

                                    {/* Publisher */}
                                    <Table.Cell>
                                        <span className="truncate max-w-[120px] block">{book.publisher}</span>
                                    </Table.Cell>

                                    {/* Price */}
                                    <Table.Cell>
                                        <span className="font-medium">${book.price}</span>
                                    </Table.Cell>

                                    {/* Date */}
                                    <Table.Cell>
                                        <span className="text-xs text-zinc-400">
                                            {new Date(book.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </Table.Cell>

                                    {/* Approval Status */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                                            isPending
                                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        }`}>
                                            {book.approvalStatus}
                                        </span>
                                    </Table.Cell>

                                    {/* Publish Status */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                                            isPublished
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                        }`}>
                                            {book.publishStatus}
                                        </span>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            {isPublished ? (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handelUnPublish(book._id)}
                                                    className="border border-red-500/20 bg-red-500/10 text-red-400 font-medium"
                                                >
                                                    Unpublish
                                                </Button>
                                            ) : 
                                            <Button
                                                    size="sm"
                                                    onClick={() => handelPublish(book._id)}
                                                    className="border border-red-500/20 bg-red-500/10 text-red-400 font-medium"
                                                >
                                                    Publish
                                                </Button>
                                            }
                                            
                                            <BookDeleteAlart bookId ={book._id}></BookDeleteAlart>
                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default AllBooksTable;