// components/Input.tsx

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  id,
  name,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={id || name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id || name}
        name={name}
        className="w-full border px-4 py-2 rounded-lg"
        {...props}
      />
    </div>
  );
}
