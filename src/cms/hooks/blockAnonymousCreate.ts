import { Forbidden, type CollectionBeforeOperationHook } from "payload";

/**
 * Refuses a create that has neither a signed-in user nor the server-only
 * `internal` context flag. Payload's first-register endpoint creates with
 * `overrideAccess: true`, so collection access alone cannot stop it.
 */
export const blockAnonymousCreate: CollectionBeforeOperationHook = ({
  operation,
  req,
}) => {
  if (operation !== "create") return;
  if (req.user || req.context?.internal === true) return;

  throw new Forbidden(req.t);
};
