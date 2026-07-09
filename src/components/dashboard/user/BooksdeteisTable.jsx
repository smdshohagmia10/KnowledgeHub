"use client";

import { Table } from "@heroui/react";
import Image from "next/image";

export default function BooksTable({ books }) {
  const headers = [
    "Cover",
    "Title", 
    "Price",
    "Buying Date",
    "Delevary Status",
    "Payment Status",
    "User Email",
  ];

  return (
    <Table aria-label="Books Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[900px]">
          
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
            {books?.map((book, i) => {
              const isPublished = book.publishStatus === "published";
              const isPending = book.approvalStatus === "pending";

              return (
                <Table.Row key={book._id} id={book._id}>

                  {/* Cover */}
                  <Table.Cell>
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={70}
                      height={100}
                      className="w-9 h-12 object-cover rounded border border-zinc-700"
                    />
                  </Table.Cell>

                  {/* Title */}
                  <Table.Cell>
                    <div className="truncate max-w-[140px]">
                      {book.title}
                    </div>
                  </Table.Cell>

                  {/* Price */}
                  <Table.Cell>
                    ${book.price}
                  </Table.Cell>

                  {/* Buying Date */}
                  <Table.Cell>
                    {book.createdAt}
                  </Table.Cell>

                  {/* Delivery Status */}
                  <Table.Cell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                      isPending
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {book.delevaryStatus}
                    </span>
                  </Table.Cell>

                  {/* Payment Status */}
                  <Table.Cell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                      isPublished
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                    }`}>
                      {book.paymentStatus}
                    </span>
                  </Table.Cell>

                  {/* User Email */}
                  <Table.Cell>
                    <span>{book.userEmail}</span>
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}