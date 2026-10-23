import type { ArrayField } from "payload";

type StringListOptions = {
  label?: string;
  required?: boolean;
};

/**
 * An ordered list of plain strings. Payload arrays hold rows, so each row
 * carries one `item`; the frontend mapper flattens it back to `string[]`.
 */
export function stringList(name: string, options: StringListOptions = {}): ArrayField {
  return {
    name,
    type: "array",
    label: options.label,
    required: options.required,
    minRows: options.required ? 1 : undefined,
    labels: { singular: "Item", plural: "Items" },
    fields: [
      {
        name: "item",
        type: "text",
        required: true,
      },
    ],
  };
}
