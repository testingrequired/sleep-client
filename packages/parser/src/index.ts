import StateFile from "./types/StateFile";

export function verify(stateFile: StateFile): Array<Error> {
  const errors: Array<Error> = [];

  if (typeof stateFile._id !== "string") {
    errors.push(new Error("stateFile._id must be defined as a string"));
  }

  if (typeof stateFile.workspaces !== "object") {
    errors.push(new Error("stateFile.workspaces must be defined as an object"));
  } else {
    for (const [
      _idKey,
      { _id, name, description, environment }
    ] of Object.entries(stateFile.workspaces)) {
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
          console.log(
            `${key} (${typeof key}): ${value} (typeof ${typeof value})`
          );

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
  }

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
