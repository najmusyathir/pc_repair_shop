// components/PrimaryButton.tsx

import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonPri({
  children,
  onClick,
  className = "",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-medium py-2 px-4 rounded-xl shadow transition duration-150 ease-in-out ${className}`}>
      {children}
    </button>
  );
}
