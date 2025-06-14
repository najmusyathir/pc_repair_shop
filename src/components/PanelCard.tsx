export default function PanelCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: "blue" | "green";
}) {
  const bgColor =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={href}
        className={`inline-block mt-2 px-5 py-2 rounded text-white transition ${bgColor}`}>
        {title.split(" ")[0]} Login
      </a>
    </div>
  );
}
