export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            FixCore Systems
          </h1>
          <p className="text-lg text-gray-600">
            Professional PC Repair Request & Tracking System
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
            <p className="text-gray-600 mb-4">
              Create and manage repair requests, assign technicians, and
              generate invoices.
            </p>
            <a
              href="/internal/admin"
              className="inline-block mt-2 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Admin Login
            </a>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-2">Technician Panel</h2>
            <p className="text-gray-600 mb-4">
              Update repair statuses and manage assigned tasks efficiently.
            </p>
            <a
              href="/internal/technician"
              className="inline-block mt-2 px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
              Technician Login
            </a>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-xl font-medium mb-4">Customer Lookup</h3>
          <p className="text-gray-500 mb-6">
            Track your repair status and download invoice/receipt using your
            phone number.
          </p>
          <a
            href="/internal/customer"
            className="inline-block px-6 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 transition">
            Customer Portal
          </a>
        </section>
      </div>
    </main>
  );
}
