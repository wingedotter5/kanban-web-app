import Sidebar from "@/components/Sidebar";

export default async function BoardsLayout({ children }) {
  return (
    <div className="flex h-screen flex-row">
      <Sidebar className="flex-none" />
      {children}
    </div>
  );
}
