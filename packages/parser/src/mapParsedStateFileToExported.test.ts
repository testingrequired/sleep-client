import { StateFile, ParsedStateFile } from ".";
import makeTestStateFile from "./makeTestStateFile";
import mapStateFileToParsed from "./mapStateFileToParsed";
import mapParsedStateFileToExported from "./mapParsedStateFileToExported";

describe("mapParsedStateFileToExported", () => {
  const stateFileId = "stateFileId";
  const workspaceId = "workspaceId";
  const collectionId = "collectionId";
  const requestId = "requestId";
  let stateFile: StateFile;
  let parsedStateFile: ParsedStateFile;

  beforeEach(() => {
    parsedStateFile = mapStateFileToParsed(
      "",
      makeTestStateFile(stateFileId, workspaceId, collectionId, requestId)
    );

    stateFile = mapParsedStateFileToExported(parsedStateFile);
  });

  it("should map all properties", () => {
    expect(stateFile._id).toEqual(parsedStateFile._id);
    expect(stateFile.workspaces).toEqual(parsedStateFile.workspaces);
    expect(stateFile.collections).toEqual(parsedStateFile.collections);
    expect(stateFile.requests).toEqual(parsedStateFile.requests);
    expect(stateFile.environment).toEqual(parsedStateFile.environment);
    expect(stateFile.settings).toEqual(parsedStateFile.settings);
  });
});
