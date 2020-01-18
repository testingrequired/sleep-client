import { StateFile, ParsedStateFile } from ".";
import makeTestStateFile from "./makeTestStateFile";
import mapStateFileToParsed from "./mapStateFileToParsed";
import mapParsedToExport from "./mapParsedToExport";

describe("mapParsedStateFileToExported", () => {
  const stateFileId = "stateFileId";
  const workspaceId = "workspaceId";
  const collectionId = "collectionId";
  const requestId = "requestId";

  it("should map all properties", () => {
    const parsedStateFile = mapStateFileToParsed(
      "",
      makeTestStateFile(stateFileId, workspaceId, collectionId, requestId)
    );
    const stateFile = mapParsedToExport(parsedStateFile);

    expect(stateFile._id).toEqual(parsedStateFile._id);
    expect(stateFile.workspaces).toEqual(parsedStateFile.workspaces);
    expect(stateFile.collections).toEqual(parsedStateFile.collections);
    expect(stateFile.requests).toEqual(parsedStateFile.requests);
    expect(stateFile.environment).toEqual(parsedStateFile.environment);
    expect(stateFile.settings).toEqual(parsedStateFile.settings);
  });
});
