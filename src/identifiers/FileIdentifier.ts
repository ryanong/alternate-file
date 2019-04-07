import { OperationGroup, validateIdentifier } from "../operations";
import { ok, error, isError, Result } from "result-async";

export type IdentifierType = "directories" | "filename";

/** Identifier for a part of a file path */
export interface FileIdentifier {
  type: IdentifierType;
  value: string;
}

/**
 * Create a FileIdentifier for a part of a
 * path described by an operationGroup
 */
export function createIdentifierForPath(
  capture: string,
  operationGroup: OperationGroup
): Result<FileIdentifier, null> {
  const validationResult = validateIdentifier(operationGroup, capture);
  if (isError(validationResult)) return validationResult;

  const type = operationGroup.type;

  if (!(type === "directories" || type === "filename")) {
    return error(null);
  }

  return ok({
    type,
    value: capture
  });
}

export function isFilenameIdentifier(fileIdentifier: FileIdentifier): boolean {
  return fileIdentifier.type === "filename";
}
