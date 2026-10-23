export const ADMIN_NOT_INITIALISED_MESSAGE =
  "Admin not initialised. Set PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD and restart.";

/** Shown in place of Payload's open "create first user" form. */
export function AdminNotInitialised() {
  return (
    <div className="create-first-user">
      <h1>Admin not initialised</h1>
      <p>{ADMIN_NOT_INITIALISED_MESSAGE}</p>
    </div>
  );
}
