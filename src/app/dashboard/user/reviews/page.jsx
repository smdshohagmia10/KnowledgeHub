import UserReview from "@/components/dashboard/user/UserReview";
import { userReviews } from "@/lib/apis/reviews";
import { userSession } from "@/lib/core/session";
import { FaStar } from "react-icons/fa";

const ReviewPage = async () => {
  const user = await userSession();
  const reviews = await userReviews(user.id);

  return (
    <div className="space-y-6 md:p-10 p-2">
      {/* Header */}
      <div className=" border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <FaStar className="text-amber-500 text-2xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">My Reviews</h1>
            <p className="text-gray-500">
              Manage and track all your book reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-2xl p-5  shadow-sm">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-1">
            {reviews?.length || 0}
          </h2>
        </div>

        <div className="border rounded-2xl p-5  shadow-sm">
          <p className="text-sm text-gray-500">Latest Activity</p>
          <h2 className="text-lg font-semibold mt-1">
            {reviews?.length ? "Active Reviewer" : "No Reviews Yet"}
          </h2>
        </div>

        <div className="border rounded-2xl p-5  shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <h2 className="text-lg font-semibold mt-1 text-green-600">
            {reviews?.length ? "Published" : "Inactive"}
          </h2>
        </div>
      </div>

      {/* Reviews Section */}
      <div className=" border rounded-2xl shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Review History
          </h2>
        </div>

        <div className="p-6">
          {reviews?.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <UserReview
                  key={review._id}
                  treview={review}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <FaStar className="text-5xl text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold">
                No Reviews Found
              </h3>
              <p className="text-gray-500 mt-1">
                You haven't reviewed any books yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;