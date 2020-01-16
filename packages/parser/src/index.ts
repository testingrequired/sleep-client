import StateFile from "./types/StateFile";
import Workspace from "./types/Workspace";

export function verify(stateFile: StateFile): Array<Error> {
  const errors: Array<Error> = [];

  if (typeof stateFile._id !== "string") {
    errors.push(new Error("stateFile._id must be defined as a string"));
  }

  verifyWorkspaces(stateFile.workspaces, errors);

  verifyItem(
    stateFile.collections,
    x => typeof x === "object",
    "stateFile.collections must be defined as an object",
    errors
  );

  verifyItem(
    stateFile.requests,
    x => typeof x === "object",
    "stateFile.requests must be defined as an object",
    errors
  );

  verifyItem(
    stateFile.environment,
    x => typeof x === "object",
    "stateFile.environment must be defined as an object",
    errors
  );

  verifyItem(
    stateFile.settings,
    x => typeof x === "object",
    "stateFile.settings must be defined as an object",
    errors
  );

  return errors;
}

function verifyWorkspaces(
  workspaces: Record<string, Workspace>,
  errors: Array<Error>
) {
  if (typeof workspaces !== "object") {
    errors.push(new Error("stateFile.workspaces must be defined as an object"));
  } else {
    for (const [_idKey, workspace] of Object.entries(workspaces)) {
      verifyWorkspace(workspace, _idKey, errors);
    }
  }
}

function verifyWorkspace(
  workspace: Workspace,
  _idKey: string,
  errors: Error[]
) {
  const { _id, name, description, environment } = workspace;

  verifyItem(
    _id,
    x => typeof x === "string",
    `stateFile.workspaces[${_idKey}]._id must be defined as a string`,
    errors
  );

  verifyItem(
    name,
    x => typeof x === "string",
    `stateFile.workspaces[${_idKey}].name must be defined as a string`,
    errors
  );

  verifyItem(
    description,
    x => {
      if (x) {
        return typeof x === "string";
      }
      return true;
    },
    `stateFile.workspaces[${_idKey}].description must be defined as a string`,
    errors
  );

  verifyItem(
    environment,
    x => {
      if (x) {
        return typeof x === "object";
      }
      return true;
    },
    `stateFile.workspaces[${_idKey}].environment must be defined as an object`,
    errors
  );

  if (environment) {
    Object.entries(environment).forEach(([key, value]) => {
      verifyItem(
        key,
        x => typeof x === "string",
        `stateFile.workspaces[${_idKey}].environment has non string key: ${key}`,
        errors
      );

      verifyItem(
        value,
        x => typeof x === "string",
        `stateFile.workspaces[${_idKey}].environment[${key}] has non string value: ${value}`,
        errors
      );
    });
  }
}

function verifyItem<T>(
  value: T,
  validCondition: (value: T) => boolean,
  message: string,
  errors: Array<Error>
) {
  if (!validCondition.call(null, value)) {
    errors.push(new Error(message));
  }
}
