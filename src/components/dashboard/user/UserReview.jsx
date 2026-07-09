import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import { EditeModal } from "./EditeModal";
import { DeleteModal } from "./DeleteModal";

const UserReview = ({ treview }) => {
  const {
    bookTitle,
    bookImage,
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
      {bookImage ? (
        <Image
          src={bookImage}
          alt={bookTitle}
          width={80}
          height={90}
          className="rounded-xl object-cover shrink-0 w-14 h-18"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shrink-0">
          {bookTitle?.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-sm font-semibold">{bookTitle}</span>

            <div className="flex items-center gap-0.5 my-1">
              {Array.from({ length: totalStars }, (_, i) =>
                i < filledStars ? (
                  <FaStar key={i} className="text-amber-400 text-sm" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300 text-sm" />
                )
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-400">
              {formattedDate}
            </span>

            <div className="flex items-center gap-2">
              <EditeModal treview={treview}></EditeModal>

              <DeleteModal treview={treview}></DeleteModal>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mt-2">
          {review}
        </p>
      </div>
    </div>
  );
};

export default UserReview;