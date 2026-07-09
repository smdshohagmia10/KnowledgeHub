"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BuyBookButton = ({ bookId, price }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleBuy = async () => {
    if (!session?.user) {
      toast.info("Please login to purchase this book");
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("bookId", bookId);

      const res = await fetch("/api/checkout", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error(data.error || "Checkout failed");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!price || Number(price) <= 0) return null;

  return (
    <button
      onClick={handleBuy}
      disabled={isLoading}
      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2"
    >
      {isLoading ? "Processing..." : `🛒 Buy this Book — $${price}`}
    </button>
  );
};

export default BuyBookButton;