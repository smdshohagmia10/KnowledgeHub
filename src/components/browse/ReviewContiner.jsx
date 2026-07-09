import { bookReviews } from "@/lib/apis/reviews";
import ReviewCard from "./ReviewCard";

const ReviewContainer = async ({ bookId }) => {
  const reviews = await bookReviews(bookId);
  console.log(reviews)

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="h-80 overflow-y-auto pr-2 flex flex-col gap-3">
      {reviews.map((review) => (
        <ReviewCard key={review._id} treview={review} />
      ))}
    </div>
  );
};

export default ReviewContainer;