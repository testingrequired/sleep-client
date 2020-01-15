import StateFile from "./types/StateFile";
import { verify } from "./index";

describe("parser", () => {
  const stateFileId = "stateFileId";
  const workspaceId = "workspaceId";
  const collectionId = "collectionId";
  const requestId = "requestId";
  let stateFile: StateFile;

  beforeEach(() => {
    stateFile = {
      _id: stateFileId,
      environment: {},
      settings: {},
      workspaces: {},
      collections: {},
      requests: {}
    };

    stateFile.workspaces[workspaceId] = {
      _id: workspaceId,
      name: "workspace name",
      environment: {}
    };

    stateFile.collections[collectionId] = {
      _id: collectionId,
      _parentId: workspaceId,
      name: "collection name"
    };

    stateFile.requests[requestId] = {
      _id: requestId,
      _parentId: collectionId,
      name: "request name",
      url: "request url",
      method: "GET"
    };
  });

  describe("verify", () => {
    it("should not error with happy path", () => {
      expect(() => verify(stateFile)).not.toThrow();
    });

    describe("workspace", () => {
      it.todo("should error if _id is not defined");
      it.todo("should error if name is not defined");
      it.todo("should not error if description is not defined");
      it.todo("should not error if environment is not defined");
    });

    describe("collection", () => {
      it.todo("should error if _id is not defined");

      it.todo("should error if _parentId is not defined");
      it.todo(
        "should error when collection references non workspace parent id"
      );
      it.todo("should error when collection references non existent parent id");

      it.todo("should error if name is not defined");
      it.todo("should not error if description is not defined");
      it.todo("should not error if environment is not defined");
    });

    describe("request", () => {
      it.todo("should error if _id is not defined");

      it.todo("should error if _parentId is not defined");
      it.todo("should error when request references non workspace parent id");
      it.todo("should error when request references non existent parent id");

      it.todo("should error if name is not defined");
      it.todo("should error if method is not defined");
      it.todo("should error if url is not defined");
      it.todo("should not error if description is not defined");
      it.todo("should not error if environment is not defined");
      it.todo("should not error if headers is not defined");
      it.todo("should not error if query is not defined");
      it.todo("should not error if redirect is not defined");
      it.todo("should error if redirect is defined with invalid value");
      it.todo("should not error if redirect is defined with valid value");
      it.todo("should not error if body is not defined");
      it.todo("should error if body is not a string");
    });
  });
});
