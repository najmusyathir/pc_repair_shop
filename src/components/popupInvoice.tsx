"use client";
import React from "react";
import PopupModal from "@/components/PopupModal";
import ButtonPri from "@/components/ButtonPri";

interface RepairProp {
  id: number;
  device_name: string;
  request_date: string;
  status: string;
  cust_name: string;
  cust_phone: string;
  description: string;
  price?: number;
  warranty?: string;
}

interface PopupInvoiceProps {
  repair: RepairProp | null;
  onClose: () => void;
}

export default function PopupInvoice({ repair, onClose }: PopupInvoiceProps) {
  if (!repair) return null;

  return (
    <PopupModal isOpen={!!repair} onClose={onClose}>
      <div className="space-y-4 p-3">
        <div
          id="receipt-content"
          className="bg-white p-6 border rounded flex flex-col gap-3 shadow text-sm print:p-0 print:shadow-none print:border-none print:text-black">
          <h2 className="text-2xl font-bold text-center">FixCore Receipt</h2>
          <hr className="mb-4" />

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <p>
                <strong>Receipt ID:</strong> {repair.id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(repair.request_date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p>
                <strong>Customer:</strong> {repair.cust_name}
              </p>
              <p>
                <strong>Phone:</strong> {repair.cust_phone}
              </p>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="flex flex-col gap-1">
            <p>
              <strong>Device:</strong> {repair.device_name}
            </p>
            <p>
              <strong>Status:</strong> {repair.status}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p className="whitespace-pre-wrap border p-2 rounded bg-gray-50">
              {repair.description}
            </p>
            <p className="pt-3 text-xl">
              <strong>Price:</strong> RM{" "}
              {repair.price != null ? repair.price : "0.00"}
            </p>
            <small className="py-2">
              <span className="italic">Warranty reference:</span>{" "}
              {repair.warranty ?? "-"}
            </small>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            Thank you for choosing FixCore Systems.
          </div>
        </div>

        <ButtonPri
          onClick={() => {
            const printContents =
              document.getElementById("receipt-content")?.innerHTML;
            const win = window.open("", "_blank");
            if (win && printContents) {
              win.document.write(`
                <html>
                  <head>
                    <title>Receipt</title>
                    <style>
                      body { font-family: sans-serif; padding: 20px; }
                      .border { border: 1px solid #ccc; }
                      .rounded { border-radius: 6px; }
                      .p-2 { padding: 8px; }
                      .text-center { text-align: center; }
                      .text-right { text-align: right; }
                      .text-xs { font-size: 0.75rem; }
                      .text-black { color: #000; }
                      .font-bold { font-weight: bold; }
                      .bg-gray-50 { background-color: #f9fafb; }
                    </style>
                  </head>
                  <body onload="window.print(); window.close();">
                    ${printContents}
                  </body>
                </html>`);
              win.document.close();
            }
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Print Receipt
        </ButtonPri>
      </div>
    </PopupModal>
  );
}
