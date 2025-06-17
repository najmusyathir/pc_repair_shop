import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function Textarea({
  label,
  id,
  name,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={id || name} className="block mb-1 font-medium">
        {label}
      </label>
      <textarea
        id={id || name}
        name={name}
        rows={rows}
        className="w-full border px-4 py-2 rounded-lg"
        {...props}
      />
    </div>
  );
}
