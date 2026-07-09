"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Chip,
  Skeleton,
  Select,
  ListBox,
  TextField,
  InputGroup,
  Pagination,
} from "@heroui/react";
import { FaSearch, FaTimes, FaBookOpen, FaFilter } from "react-icons/fa";
import BookCard from "./BookCard";
// 1. ভুল ইমপোর্ট সংশোধন (next/router এর বদলে next/navigation)
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Technology",
  "Romance",
  "Mystery",
  "Biography",
];

export default function BookGrid({ books , total, isLoading = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const hasFilters = search || category !== "All";
  const clearAll = () => {
    setSearch("");
    setCategory("All");
  };

  useEffect(() => {
    const sp = new URLSearchParams();
    if (search) sp.set("search", search);
    if (category !== "All") sp.set("category", category);
    if(page){sp.set("page",page) }
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [category, search, router,page]);

  return (
    <div className="min-h-screen px-4 py-10 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <FaBookOpen className="text-purple-500 text-2xl md:text-3xl" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Browse Books
          </h1>
        </div>
        <p className="text-default-400 text-sm ml-9 md:ml-10">
          {total} titles available in the library collection
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Row 1: Search */}
        <TextField value={search} onChange={setSearch}>
          <InputGroup className="max-w-md bg-content1 rounded-xl border border-default-200 shadow-sm">
            <InputGroup.Prefix className="pl-3 text-default-400">
              <FaSearch size={14} />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search by title, author, or keywords..."
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm py-2 bg-transparent w-full focus:outline-none text-foreground"
            />
            {search && (
              <InputGroup.Suffix className="pr-3 text-default-400 cursor-pointer hover:text-danger" onClick={() => setSearch("")}>
                <FaTimes size={14} />
              </InputGroup.Suffix>
            )}
          </InputGroup>
        </TextField>
      </div>

      {/* Row 2: Category pills + Clear */}
      <div className="flex flex-wrap gap-2 items-center bg-default-50 p-3 rounded-xl border border-default-100/60">
        <div className="flex items-center gap-1.5 text-default-400 text-xs font-medium mr-1 shrink-0 select-none">
          <FaFilter size={10} />
          <span>Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 flex-1">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              variant={category === cat ? "solid" : "flat"}
              color={category === cat ? "secondary" : "default"}
              onClick={() => setCategory(cat)}
              className={`cursor-pointer text-xs font-medium transition-all select-none px-2 h-7 rounded-lg ${
                category === cat
                  ? "font-semibold shadow-sm text-white"
                  : "text-default-500 bg-default-100 hover:bg-default-200"
              }`}
            >
              {cat}
            </Chip>
          ))}
        </div>

        {hasFilters && (
          <Button
            size="sm"
            variant="flat"
            color="danger"
            startContent={<FaTimes className="text-xs" />}
            onPress={clearAll}
            className="text-xs h-7 rounded-lg font-medium shrink-0 ml-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Result count */}
      <p className="text-default-400 text-xs my-5 font-medium flex items-center gap-1">
        {isLoading
          ? "Loading books from server..."
          : `Showing ${books.length} of ${total} books`}
        {!isLoading && category !== "All" && <span className="bg-default-200 text-default-700 px-1.5 py-0.5 rounded-md ml-1 text-[10px] font-semibold">{category}</span>}
        {!isLoading && search && <span className="bg-default-200 text-default-700 px-1.5 py-0.5 rounded-md ml-1 text-[10px] font-semibold">"{search}"</span>}
      </p>

      {/* Responsive Grid Layout */}
      {isLoading ? (
        /* 2 columns on mobile, 3 on tablet, 4 on desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-content1 rounded-2xl border border-default-100 overflow-hidden shadow-sm">
              {/* Cover Aspect Ratio Loader */}
              <Skeleton className="aspect-[3/4] w-full bg-default-200" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4 rounded-md bg-default-200" />
                <Skeleton className="h-3 w-1/2 rounded-md bg-default-200" />
                <div className="flex justify-between items-center pt-2">
                   <Skeleton className="h-5 w-16 rounded-full bg-default-200" />
                   <Skeleton className="h-5 w-10 rounded-full bg-default-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        /* 2 columns on mobile, 3 on tablet, 4 on desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.map((book, i) => (
            <BookCard key={book._id || book.id || i} book={book} />
          ))}
        </div>
      ) : (
        /* Friendly message when no books match filters */
        <div className="flex flex-col items-center justify-center py-24 text-center max-w-sm mx-auto gap-4 bg-default-50/50 rounded-2xl border border-dashed border-default-200 p-8">
          <div className="p-4 bg-default-100 rounded-full text-default-400">
            <FaBookOpen size={40} />
          </div>
          <div>
            <p className="text-foreground font-bold text-base">No books found</p>
            <p className="text-default-400 text-sm mt-1">
              We couldn't find any books matching your current search or category filters.
            </p>
          </div>
          {hasFilters && (
            <Button
              color="secondary"
              variant="flat"
              size="sm"
              startContent={<FaTimes size={12} />}
              onPress={clearAll}
              className="rounded-lg font-medium text-xs shadow-sm"
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination wrapper */}
      <Pagination className="w-full mt-10 border-t border-default-100 pt-6 flex flex-col items-center gap-4">
        <Pagination.Summary className="text-xs font-medium text-default-400">
          Showing {startItem}-{endItem} of {totalItems} results
        </Pagination.Summary>
        <Pagination.Content className="flex items-center gap-1">
          <Pagination.Item>
            <Pagination.Previous 
              isDisabled={page === 1} 
              onPress={() => setPage((p) => p - 1)}
              className="h-9 px-3 rounded-xl border border-default-200 bg-content1 text-xs font-medium hover:bg-default-100 transition-colors inline-flex items-center gap-1 text-default-600 disabled:opacity-50"
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis className="w-9 h-9 flex items-center justify-center text-default-400" />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={`${p}-${i}`}>
                  <Pagination.Link 
                    isActive={p === page} 
                    onPress={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-all border ${
                      p === page 
                        ? "bg-secondary text-white border-secondary shadow-sm" 
                        : "bg-content1 text-default-600 border-default-200 hover:bg-default-100"
                    }`}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
          </div>

          <Pagination.Item>
            <Pagination.Next 
              isDisabled={page === totalPages} 
              onPress={() => setPage((p) => p + 1)}
              className="h-9 px-3 rounded-xl border border-default-200 bg-content1 text-xs font-medium hover:bg-default-100 transition-colors inline-flex items-center gap-1 text-default-600 disabled:opacity-50"
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}