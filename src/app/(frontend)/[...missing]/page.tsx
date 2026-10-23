import { notFound } from "next/navigation";

// With two root layouts there is no top-level layout to render unmatched
// URLs, so this catch-all sends them to the site's own not-found page.
export default function MissingPage() {
  notFound();
}
