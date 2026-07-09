import { Card, Chip } from "@heroui/react";
import { FaBookOpen, FaTag, FaUser, FaTruck, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_STYLES = {
  Fiction:       { chip: "secondary", spine: "bg-purple-500" },
  "Non-Fiction": { chip: "warning",   spine: "bg-amber-500"  },
  Science:       { chip: "success",   spine: "bg-teal-500"   },
  History:       { chip: "danger",    spine: "bg-red-500"    },
  Technology:    { chip: "primary",   spine: "bg-blue-500"   },
  Romance:       { chip: "danger",    spine: "bg-pink-500"   },
  Mystery:       { chip: "secondary", spine: "bg-violet-500" },
  Biography:     { chip: "success",   spine: "bg-green-500"  },
};

const DEFAULT_STYLE = { chip: "default", spine: "bg-zinc-500" };

const formatPrice = (price) => {
  if (price === 0 || price === "0") return "Free";
  return price ? `$${parseFloat(price).toFixed(2)}` : "—";
};

export default function BookCard({ book }) {
  if (!book) return null;

  const {
    title = "Unknown Title",
    author = "Unknown Author",
    category = "General",
    price,
    coverImage,
    description,
    deliveryFee, 
    isAvailable = true, 
  } = book;

  const bookId = book._id?.$oid || book._id;
  const { chip, spine } = CATEGORY_STYLES[category] || DEFAULT_STYLE;

  return (
    <Card className="relative bg-content1 border border-default-100 hover:border-default-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer p-0 flex flex-col justify-between h-full">

      {/* Spine */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${spine} z-10`} />

      <div>
        {/* Cover Section */}
        <div className="relative aspect-[16/10] w-full bg-default-100 overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-default-50">
              <FaBookOpen className="text-4xl text-default-300" />
            </div>
          )}
          
          {/* Top-Right Badges */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 items-end">
            <Chip color={chip} variant="solid" size="sm" className="text-[10px] font-bold uppercase tracking-wide text-white h-5">
              {category}
            </Chip>
            
            {!isAvailable && (
              <Chip color="danger" variant="solid" size="sm" className="text-[9px] font-extrabold uppercase tracking-wider h-5 px-1.5 shadow-sm">
                Unavailable
              </Chip>
            )}
          </div>
        </div>

        {/* Body Section */}
        <div className="pl-6 pr-4 pt-4 pb-2 flex flex-col gap-1.5">
          <h3 className="text-foreground font-bold text-sm leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-default-400 text-xs">
            <FaUser className="text-[10px] shrink-0" />
            <span className="italic truncate font-medium">{author}</span>
          </div>
          {description && (
            <p className="text-default-400 text-xs leading-relaxed line-clamp-2 mt-0.5">{description}</p>
          )}

          {/* Delivery Fee Info */}
          <div className="flex items-center gap-1 text-[11px] text-default-400 mt-1">
            <FaTruck className="text-default-300" size={12} />
            <span>Delivery: {deliveryFee ? `৳${deliveryFee}` : <span className="text-success font-semibold">Free</span>}</span>
          </div>
        </div>
      </div>

      {/* Footer Section (রেটিং ছাড়া ক্লিন লেআউট) */}
      <div className="pl-6 pr-4 py-3.5 flex justify-between items-center border-t border-default-100 mt-auto bg-default-50/50">
        <div className="flex items-center gap-1 text-xs">
          <FaTag className="text-secondary text-[10px]" />
          <span className="text-foreground font-bold">{formatPrice(price)}</span>
        </div>
        
        {bookId && (
          <Link href={`/browse/${bookId}`} className="text-[11px] text-secondary hover:text-secondary-400 font-bold transition-colors flex items-center gap-1 group/btn">
            Details 
            <FaArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </Card>
  );
}