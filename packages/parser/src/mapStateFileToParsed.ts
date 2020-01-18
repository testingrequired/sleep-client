import StateFile from "./types/StateFile";
import ParsedStateFile from "./ParsedStateFile";

export default function mapStateFileToParsed(
  stateFile: StateFile
): ParsedStateFile {
  const {
    _id,
    workspaces,
    collections,
    requests,
    environment,
    settings
  } = stateFile;

  const parsedStateFile = new ParsedStateFile(
    "",
    _id,
    workspaces,
    collections,
    requests,
    environment,
    settings
  );

  return parsedStateFile;
}
