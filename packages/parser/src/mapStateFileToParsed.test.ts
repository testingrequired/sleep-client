import { StateFile } from ".";
import makeTestStateFile from "./makeTestStateFile";
import mapStateFileToParsed from "./mapStateFileToParsed";

describe("mapStateFileToParsed", () => {
  const stateFileId = "stateFileId";
  const workspaceId = "workspaceId";
  const collectionId = "collectionId";
  const requestId = "requestId";
  let stateFile: StateFile;

  beforeEach(() => {
    stateFile = makeTestStateFile(
      stateFileId,
      workspaceId,
      collectionId,
      requestId
    );
  });

  it("should map all properties", () => {
    const parsedStateFile = mapStateFileToParsed(stateFile);

    expect(parsedStateFile._id).toEqual(stateFile._id);
    expect(parsedStateFile.workspaces).toEqual(stateFile.workspaces);
    expect(parsedStateFile.collections).toEqual(stateFile.collections);
    expect(parsedStateFile.requests).toEqual(stateFile.requests);
    expect(parsedStateFile.environment).toEqual(stateFile.environment);
    expect(parsedStateFile.settings).toEqual(stateFile.settings);
  });
});
