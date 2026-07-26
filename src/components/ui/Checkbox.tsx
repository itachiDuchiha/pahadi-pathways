type CheckboxProps = {
  label: string;
};

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-600"
      />

      <span className="text-gray-700">
        {label}
      </span>
    </label>
  );
}