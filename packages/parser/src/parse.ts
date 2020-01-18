import StateFile from "./types/StateFile";
import ParsedStateFile from "./ParsedStateFile";
import verify from "./verify";
import mapStateFileToParsed from "./mapStateFileToParsed";

export default function parse(stateFile: StateFile): ParsedStateFile {
  const errors = verify(stateFile);

  if (errors.length > 0) {
    const errorMessages = errors.map(e => e.message).join(", ");
    throw new Error(
      `There were some issues with the state file: ${errorMessages}`
    );
  }

  return mapStateFileToParsed(stateFile);
}
