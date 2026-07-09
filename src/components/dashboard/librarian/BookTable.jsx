"use client";

import { publishBook, unpublishBook } from "@/lib/action/books";
import { Button, Table } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BooksTable({ books }) {
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

  const approvalStyles = {
    approved:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const headers = [
    { id: "cover", label: "Cover" },
    { id: "title", label: "Title" },
    { id: "author", label: "Author" },
    { id: "category", label: "Category" },
    { id: "language", label: "Language" },
    { id: "price", label: "Price" },
    { id: "year", label: "Year" },
    { id: "approval", label: "Approval" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <Table aria-label="Books Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[1100px]">
          {/* Header */}
          <Table.Header >
            {headers.map((item) => (
              <Table.Column isRowHeader key={item.id} id={item.id}>
                {item.label}
              </Table.Column>
            ))}
          </Table.Header>

          {/* Body */}
          <Table.Body emptyContent={"No books found"}>
            {(books || []).map((book) => {
              const isPublished = book.publishStatus === "published";

              return (
                <Table.Row key={book._id} id={book._id}>
                  {/* Cover */}
                  <Table.Cell>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={70}
                      height={90}
                      className="h-14 w-10 rounded-md border border-zinc-700 object-cover"
                    />
                  </Table.Cell>

                  {/* Title */}
                  <Table.Cell>
                    <div className="max-w-[220px]">
                      <p className="truncate font-medium">
                        {book.title}
                      </p>
                    </div>
                  </Table.Cell>

                  {/* Author */}
                  <Table.Cell>
                    <div className="max-w-[160px]">
                      <p className="truncate">{book.author}</p>
                    </div>
                  </Table.Cell>

                  {/* Category */}
                  <Table.Cell>
                    <span className="capitalize">{book.category}</span>
                  </Table.Cell>

                  {/* Language */}
                  <Table.Cell>
                    <span className="capitalize">{book.language}</span>
                  </Table.Cell>

                  {/* Price */}
                  <Table.Cell>
                    <span className="font-medium">${book.price}</span>
                  </Table.Cell>

                  {/* Year */}
                  <Table.Cell>
                    {book.publicationYear}
                  </Table.Cell>

                  {/* Approval Status */}
                  <Table.Cell>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        approvalStyles[book.approvalStatus] ||
                        "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                      }`}
                    >
                      {book.approvalStatus}
                    </span>
                  </Table.Cell>

                  {/* Publish Status */}
                  <Table.Cell>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        isPublished
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                      }`}
                    >
                      {book.publishStatus}
                    </span>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      {isPublished ? (
                        <Button
                          size="sm"
                          onPress={() => handelUnPublish(book._id)}
                          className="border border-red-500/20 bg-red-500/10 text-red-400"
                        >
                          Unpublish
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onPress={() => handelPublish(book._id)}
                          disabled={book.approvalStatus !== "approved"}
                          className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Publish
                        </Button>
                      )}
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
}