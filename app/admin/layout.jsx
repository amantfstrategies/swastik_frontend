import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";



export default function AdminLayout({ children }) {

  return (
    <div className="flex font-montserrat min-h-screen flex-col">
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 ml-64">
          <AdminHeader />
          <div className="mt-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
