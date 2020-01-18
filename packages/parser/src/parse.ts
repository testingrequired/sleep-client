import fs from "fs";
import { promisify } from "util";
import ParsedStateFile from "./ParsedStateFile";
import verify from "./verify";
import mapStateFileToParsed from "./mapStateFileToParsed";

export default async function parse(
  filePath: string
): Promise<ParsedStateFile> {
  const stateFileRaw = await promisify(fs.readFile)(filePath, "utf8");

  const stateFile = JSON.parse(stateFileRaw);

  const errors = verify(stateFile);

  if (errors.length > 0) {
    const errorMessages = errors.map(e => e.message).join(", ");
    throw new Error(
      `There were some issues with the state file: ${errorMessages}`
    );
  }

  return mapStateFileToParsed(filePath, stateFile);
}
