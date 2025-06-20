import React from "react";

const TextInput = React.forwardRef(
  ({ type, placeholder, styles = "", label, register, name, error }, ref) => {
    return (
      <div className="flex flex-col gap-1 mt-3 w-full">
        {label && (
          <label className="text-sm font-semibold text-slate-700">{label}</label>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`px-4 py-2 text-sm rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out bg-white ${styles} ${
            error ? "border-red-500" : ""
          }`}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />

        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>
    );
  }
);

export default TextInput;
