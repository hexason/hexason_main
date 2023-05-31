import AdminProvider from "./provider";

export default function AdminLayout({ children }: any) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}