import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const sessionData = await auth.api.getSession({
      headers: headersList,
    });

    const user = sessionData?.user;
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    let bookId = formData.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("jobe-finder");

    const book = await db.collection("books").findOne({
      _id: new ObjectId(bookId),
    });
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }
    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(book.price) * 100,
            product_data: {
              name: book.title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookId: book._id.toString(),
        userId: user.id,
        userEmail: user.email,
        title: book.title,
        price: book.price,
        image: book.coverImage,
        librarianId : book.librarianId,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/browse/${bookId}`,
    });

    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message,},
      {status: 500,}
    );
  }
}