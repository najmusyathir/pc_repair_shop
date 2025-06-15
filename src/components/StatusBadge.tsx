export default function StatusBadge({ status }: { status: string }) {
  const statusStyles: { [key: string]: string } = {
    ongoing: "border border-blue-500 bg-blue-100 text-blue-700",
    pending: "border border-yellow-500 bg-yellow-100 text-yellow-700",
    completed: "border border-green-500 bg-green-100 text-green-700",
    failed: "border border-red-500 bg-red-100 text-red-700",
    repairing: "border border-indigo-500 bg-indigo-100 text-indigo-700",
    canceled: "border border-gray-500 bg-gray-100 text-gray-700",
  };

  const baseStyle = "rounded px-4 py-2 text-sm font-medium";
  const appliedStyle = statusStyles[status] || "border border-gray-400 bg-gray-100 text-gray-600";

  return <span className={`${baseStyle} ${appliedStyle}`}>{status}</span>;
}
