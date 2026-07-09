import Link from "next/link";
import BuyBookButton from "@/components/browse/BuyBookButton";
import { ReviewModal } from "@/components/ReviewModal";
import { userReadedBooks } from "@/lib/apis/userBooks";
import Image from "next/image";
import { getBookDeteils } from "@/lib/apis/books";
import ReviewContiner from "@/components/browse/ReviewContiner";
import { userSession } from "@/lib/core/session";
import {
  FaArrowLeft,
  FaBook,
  FaRegCheckCircle,
  FaFileAlt,
} from "react-icons/fa";
import { Chip, Card } from "@heroui/react";

const BookDetailsPage = async ({ params }) => {
  const user = await userSession();
  const { id } = await params;
  const book = await getBookDeteils(id);

  const books = await userReadedBooks().catch(() => []);
  const bookReaded = Array.isArray(books) 
  ? books.some(bok => bok.bookId == book?._id?.toString()) 
  : false;

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="p-4 bg-danger-50 text-danger rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <FaBook size={28} />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Book Not Found</h1>
        <p className="text-default-400 text-sm mt-1">
          The book you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/browse?page=1"
          className="text-secondary hover:underline font-semibold mt-4 inline-flex items-center gap-1.5 text-sm"
        >
          <FaArrowLeft size={12} /> Back to browse
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Back Link */}
      <Link
        href="/browse?page=1"
        className="inline-flex items-center gap-2 text-sm font-medium text-default-400 hover:text-secondary transition-colors group mb-2"
      >
        <FaArrowLeft
          size={12}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to browse
      </Link>

      {/* Top Section — Cover & Hero Details */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start border-b border-default-100 pb-8">
        {/* Book Cover Image */}
        <div className="w-40 h-56 md:w-48 md:h-64 shrink-0 rounded-2xl bg-secondary-50 dark:bg-secondary-950/20 flex items-center justify-center border border-default-200/60 shadow-md overflow-hidden relative group">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              width={300}
              height={400}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-5xl text-secondary-400">📖</span>
          )}
        </div>

        {/* Core Metadata */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-wrap gap-2">
            <Chip
              size="sm"
              variant="flat"
              color="success"
              className="capitalize font-medium"
            >
              ✓ {book.approvalStatus || "Approved"}
            </Chip>
            <Chip
              size="sm"
              variant="flat"
              color="secondary"
              className="capitalize font-medium"
            >
              {book.category}
            </Chip>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {book.title}
            </h1>
            <p className="text-base text-default-400 mt-1 font-medium">
              {book.author}
            </p>
          </div>

          {/* Pricing Info */}
          {book.price > 0 && (
            <div className="inline-block">
              <span className="text-xs font-semibold text-default-400 uppercase tracking-wider block">
                Price
              </span>
              <p className="text-2xl md:text-3xl font-extrabold text-orange-500 mt-0.5">
                ${book.price}
              </p>
            </div>
          )}

          {/* Action Button Area */}
          <div className="pt-2">
            {!user ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm"
                >
                  Login to Purchase
                </Link>
                <p className="text-xs font-medium text-default-400">
                  You must be logged in to order books and write reviews.
                </p>
              </div>
            ) : user?.role === "user" ? (
              <BuyBookButton bookId={book._id.toString()} price={book.price} />
            ) : (
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 px-4 py-2.5 rounded-xl shadow-sm">
                <span>⚠️ Only regular Readers can purchase books</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid for Description and Tech Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About / Description */}
        {book.description && (
          <div className="md:col-span-2 bg-content1 rounded-2xl p-6 border border-default-100 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-default-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaFileAlt /> About this book
            </h3>
            <p className="text-default-700 text-sm leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        )}

        {/* Detailed Spec Sheet */}
        <div className="bg-content1 rounded-2xl p-6 border border-default-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-default-400 uppercase tracking-wider">
            Book Details
          </h3>
          <div className="space-y-3">
            {[
              { label: "Category", value: book.category },
              { label: "Author", value: book.author },
              { label: "Publisher", value: book.publisher },
              { label: "Published", value: book.publishedDate },
              { label: "ISBN", value: book.isbn },
            ].map(({ label, value }) =>
              value ? (
                <div
                  key={label}
                  className="flex flex-col py-1.5 border-b border-default-50 last:border-none"
                >
                  <span className="text-[11px] font-semibold text-default-400 uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-foreground mt-0.5">
                    {value}
                  </span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Review Notification Prompt */}
      {bookReaded ? (
        <Card className="border border-dashed border-secondary-300 dark:border-secondary-800 bg-secondary-50/30 shadow-none rounded-2xl">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <FaRegCheckCircle className="text-secondary" /> Finished reading
                this book?
              </h3>
              <p className="text-xs text-default-400 mt-1">
                Share your valuable thoughts and rating with the KnowledgeHub
                community.
              </p>
            </div>
            <ReviewModal book={book} />
          </div>
        </Card>
      ) : (
        <div className="border border-dashed border-default-200 bg-default-50/50 rounded-2xl p-5 text-center sm:text-left">
          <p className="text-xs font-medium text-default-400">
            🔒 You can submit a review and rating once you have completed
            reading this book.
          </p>
        </div>
      )}

      {/* Review Section Timeline / Container */}
      <div className="bg-content1 border border-default-100 rounded-2xl p-6 shadow-sm">
        <ReviewContiner bookId={book._id}></ReviewContiner>
      </div>
    </div>
  );
};

export default BookDetailsPage;
