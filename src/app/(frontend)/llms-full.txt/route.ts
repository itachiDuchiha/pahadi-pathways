import { getDestinations } from "@/lib/cms/destinations";
import { getPackages } from "@/lib/cms/packages";
import { getSiteSettings } from "@/lib/cms/site";
import { buildLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  const [packages, destinations, site] = await Promise.all([
    getPackages(),
    getDestinations(),
    getSiteSettings(),
  ]);

  return new Response(buildLlmsFullTxt({ packages, destinations, site }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
