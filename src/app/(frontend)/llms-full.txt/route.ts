import { getDestinations } from "@/lib/cms/destinations";
import { getPackages } from "@/lib/cms/packages";
import { buildLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  const [packages, destinations] = await Promise.all([getPackages(), getDestinations()]);

  return new Response(buildLlmsFullTxt({ packages, destinations }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
