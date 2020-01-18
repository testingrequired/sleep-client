import StateFile from "./types/StateFile";
import ParsedStateFile from "./ParsedStateFile";

export default function mapParsedStateFileToExported(
  parsedStateFile: ParsedStateFile
): StateFile {
  const {
    _id,
    workspaces,
    collections,
    requests,
    environment,
    settings
  } = parsedStateFile;

  const stateFile: StateFile = {
    _id,
    workspaces,
    collections,
    requests,
    environment,
    settings
  };

  return stateFile;
}
