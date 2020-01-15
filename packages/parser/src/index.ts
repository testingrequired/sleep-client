import StateFile from "./types/StateFile";

export function verify(stateFile: StateFile): Array<Error> {
  const errors: Array<Error> = [];

  if (typeof stateFile._id !== "string") {
    errors.push(new Error("stateFile._id must be defined as a string"));
  }

  if (typeof stateFile.workspaces !== "object") {
    errors.push(new Error("stateFile.workspaces must be defined as an object"));
  }

  if (typeof stateFile.collections !== "object") {
    errors.push(
      new Error("stateFile.collections must be defined as an object")
    );
  }

  if (typeof stateFile.requests !== "object") {
    errors.push(new Error("stateFile.requests must be defined as an object"));
  }

  if (typeof stateFile.environment !== "object") {
    errors.push(
      new Error("stateFile.environment must be defined as an object")
    );
  }

  if (typeof stateFile.settings !== "object") {
    errors.push(new Error("stateFile.settings must be defined as an object"));
  }

  return errors;
}
