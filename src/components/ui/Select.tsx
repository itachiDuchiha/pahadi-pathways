type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  required?: boolean;
};

export default function Select({
  label,
  options,
  required = false,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-green-700 focus:ring-2 focus:ring-green-200"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}