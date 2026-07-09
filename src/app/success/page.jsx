import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { postPaymentDeteils } from "@/lib/action/payment";


const PaymentSuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;
  let bookId = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const metadata = session.metadata; 
      
      bookId = metadata.bookId; 

      const paymentData = {
        userId: metadata.userId,
        userEmail: metadata.userEmail,
        bookId: metadata.bookId,
        title: metadata.title,
        price: metadata.price,
        image:metadata.image,
        librarianId: metadata.librarianId,
        stripeSessionId: session_id,
        paymentStatus: "paid",
        delevaryStatus:"pending",
        createdAt: new Date()
      };

      const res = await postPaymentDeteils(paymentData);
      
      if (res.ok) {
        console.log("Payment details with metadata saved to Express successfully!");
      }
    } catch (error) {
      console.error("Error retrieving Stripe metadata or saving to Express:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border border-gray-200 rounded-2xl p-10 shadow-sm">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">
          Your payment successfully completed. Thank you!
        </p>

        <div className="flex flex-col gap-3">
          {bookId && (
            <Link
              href={`/browse/${bookId}`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              ← Back to Book
            </Link>
          )}
          <Link
            href="/dashboard/user"
            className="border border-gray-200 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition"
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;