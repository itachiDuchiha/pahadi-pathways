type TextAreaProps = {
  label: string;
  placeholder?: string;
  rows?: number;
};

export default function TextArea({
  label,
  placeholder = "",
  rows = 5,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-green-700 focus:ring-2 focus:ring-green-200 resize-none"
      />
    </div>
  );
}