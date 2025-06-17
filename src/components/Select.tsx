// components/Select.tsx

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export default function Select({
  label,
  name,
  id,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id || name} className="block mb-1 font-medium">
        {label}
      </label>
      <select
        id={id || name}
        name={name}
        className="w-full border px-4 py-2 rounded-lg"
        {...props}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
