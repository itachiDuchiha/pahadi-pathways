import type { JsonLdObject } from "@/lib/structured-data";

type Props = {
  data: JsonLdObject;
};

// Escaping "<" keeps a "</script>" inside any string value from closing the tag.
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
