type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export default function Input({
  label,
  type = "text",
  placeholder = "",
  required = false,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-green-700 focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
}