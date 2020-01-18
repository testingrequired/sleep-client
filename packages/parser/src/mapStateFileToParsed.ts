import StateFile from "./types/StateFile";
import ParsedStateFile from "./ParsedStateFile";

export default function mapStateFileToParsed(
  filePath: string,
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
    filePath,
    _id,
    workspaces,
    collections,
    requests,
    environment,
    settings
  );

  return parsedStateFile;
}
