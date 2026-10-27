/**
 * Fails the build when a collection that drives static routes has no
 * published documents, so an empty database cannot ship an empty site.
 */
export function assertContentPresent(count: number, what: string): void {
  if (count > 0) return;

  throw new Error(`No published ${what} found. Run \`npm run cms:seed\` before building.`);
}
