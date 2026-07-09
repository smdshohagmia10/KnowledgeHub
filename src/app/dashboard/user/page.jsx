import RechartSection from "@/components/RechartSection";
import { nonDelevaredBook } from "@/lib/apis/userBooks";
import { userSession } from "@/lib/core/session";
import React from "react";
import { Card } from "@heroui/react";
import { FaShoppingBag, FaCheckCircle, FaClock } from "react-icons/fa";

const ReaderDashboardPage = async () => {
  const user = await userSession();
  const books = await nonDelevaredBook();
  
  const totalBuyingBook = books.length;
  const delevaredBooks = books.filter((book) => book.delevaryStatus === "delevared").length;
  const pendingBooks = books.filter((book) => book.delevaryStatus === "pending").length;

  const chartData = [
    { name: "Delivered Books", value: delevaredBooks },
    { name: "Pending Books", value: pendingBooks },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight capitalize">Reader Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here is your book delivery overview.</p>
      </div>
      
      {/* HeroUI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Total Bought Card */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Bought</p>
            <h3 className="text-2xl font-bold mt-1">{totalBuyingBook}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-500 rounded-xl">
            <FaShoppingBag className="text-xl" />
          </div>
        </Card>

        {/* Delivered Card */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Readed Books</p>
            <h3 className="text-2xl font-bold text-success mt-1">{delevaredBooks}</h3>
          </div>
          <div className="p-3 bg-success-50 dark:bg-success-950/30 text-success rounded-xl">
            <FaCheckCircle className="text-xl" />
          </div>
        </Card>

        {/* Pending Card */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
            <h3 className="text-2xl font-bold text-warning mt-1">{pendingBooks}</h3>
          </div>
          <div className="p-3 bg-warning-50 dark:bg-warning-950/30 text-warning rounded-xl">
            <FaClock className="text-xl" />
          </div>
        </Card>
      </div>

      {/* Chart Section Container */}
      <Card className="p-6 shadow-sm border border-divider">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Delivery Analytics</h3>
          <p className="text-xs text-muted-foreground">Visual breakdown of your orders</p>
        </div>
        
        {totalBuyingBook > 0 ? (
          <div className="flex justify-center items-center py-4">
            <RechartSection chartData={chartData} />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No orders found to display the data chart.
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReaderDashboardPage;