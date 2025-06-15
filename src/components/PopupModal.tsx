// components/PopupModal.tsx
"use client";

import { ReactNode } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function PopupModal({
  isOpen,
  onClose,
  children,
}: PopupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000a] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
