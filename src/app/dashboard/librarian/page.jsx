import React from "react";
import { Card } from "@heroui/react";
import { FaShoppingBag, FaCheckCircle, FaClock, FaMoneyBillWave } from "react-icons/fa";
import RechartSection from "@/components/RechartSection"; 
import { approveDelevari } from "@/lib/apis/delevary";


const LibrarianDashboardPage = async () => {
  const paymentData = await approveDelevari()
  const totalOrders = paymentData.length;
  const totalRevenue = paymentData.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  const delevaredOrders = paymentData.filter((book) => book.delevaryStatus === "delevared").length;
  const pendingOrders = paymentData.filter((book) => book.delevaryStatus === "pending").length;


  const chartData = [
    { name: "Delivered Orders", value: delevaredOrders },
    { name: "Pending Orders", value: pendingOrders },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-background text-foreground space-y-8">
      
      {/* ── Top Header ── */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight capitalize">Librarian Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Manage and track library sales and deliveries.</p>
      </div>
      
      {/* ── HeroUI Stats Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-500 rounded-xl">
            <FaShoppingBag className="text-xl" />
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-xl">
            <FaMoneyBillWave className="text-xl" />
          </div>
        </Card>

        {/* Delivered Orders */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Delivered Orders</p>
            <h3 className="text-2xl font-bold text-success mt-1">{delevaredOrders}</h3>
          </div>
          <div className="p-3 bg-success-50 dark:bg-success-950/30 text-success rounded-xl">
            <FaCheckCircle className="text-xl" />
          </div>
        </Card>

        {/* Pending Orders */}
        <Card className="p-5 flex flex-row items-center justify-between shadow-sm border border-divider">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
            <h3 className="text-2xl font-bold text-warning mt-1">{pendingOrders}</h3>
          </div>
          <div className="p-3 bg-warning-50 dark:bg-warning-950/30 text-warning rounded-xl">
            <FaClock className="text-xl" />
          </div>
        </Card>
      </div>

      {/* ── Chart Section Container ── */}
      <Card className="p-6 shadow-sm border border-divider">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Delivery Analytics</h3>
          <p className="text-xs text-muted-foreground">Visual breakdown of library business status</p>
        </div>
        
        {totalOrders > 0 ? (
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

export default LibrarianDashboardPage;