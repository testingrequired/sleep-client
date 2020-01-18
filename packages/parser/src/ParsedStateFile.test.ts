import makeTestStateFile from "./makeTestStateFile";
import ParsedStateFile from "./ParsedStateFile";

describe("ParsedStateFile", () => {
  const stateFileId = "stateFileId";
  const workspaceId = "workspaceId";
  const collectionId = "collectionId";
  const requestId = "requestId";
  let parsedStateFile: ParsedStateFile;

  beforeEach(() => {
    const stateFile = makeTestStateFile(
      stateFileId,
      workspaceId,
      collectionId,
      requestId
    );

    const {
      _id,
      workspaces,
      collections,
      requests,
      environment,
      settings
    } = stateFile;

    parsedStateFile = new ParsedStateFile(
      "",
      _id,
      workspaces,
      collections,
      requests,
      environment,
      settings
    );
  });

  describe("getWorkspaces", () => {
    it("should return workspaces values", () => {
      expect(parsedStateFile.getWorkspaces()).toStrictEqual(
        Object.values(parsedStateFile.workspaces)
      );
    });
  });

  describe("getWorkspaceCollections", () => {
    it("should return collections which parent id match workspace id", () => {
      const collections = parsedStateFile.getWorkspaceCollections(
        parsedStateFile.workspaces[workspaceId]
      );

      expect(collections).toStrictEqual(
        Object.values(parsedStateFile.collections)
      );
    });
  });

  describe("getCollectionRequests", () => {
    it("should return collections which parent id match workspace id", () => {
      const collection = parsedStateFile.collections[collectionId];
      const requests = parsedStateFile.getCollectionRequests(collection);

      expect(requests).toStrictEqual(Object.values(parsedStateFile.requests));
    });
  });
});
