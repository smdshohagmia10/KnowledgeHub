import DashboardSidebar from "@/components/dashboard/DashbordSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />

      <main className="flex-1 ">
        <div >
          {children}
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;