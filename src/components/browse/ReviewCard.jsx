import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ treview }) => {
  const {
    userName,
    userImage,
    rating,
    review,
    createdAt,
  } = treview;

  const totalStars = 5;
  const filledStars = parseInt(rating);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-100 rounded-2xl w-full">
      {userImage ? (
        <Image
          src={userImage}
          alt={userName}
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0 w-10 h-10"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shrink-0">
          {userName?.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold ">{userName}</span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-0.5 my-1">
          {Array.from({ length: totalStars }, (_, i) =>
            i < filledStars ? (
              <FaStar key={i} className="text-amber-400 text-sm" />
            ) : (
              <FaRegStar key={i} className="text-gray-300 text-sm" />
            )
          )}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;