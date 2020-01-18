import parse from "./parse";
import verify from "./verify";
import { StateFile } from ".";
import makeTestStateFile from "./makeTestStateFile";

jest.mock("./verify");
jest.mock("./mapStateFileToParsed");

describe("parse", () => {
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

  describe("when verify returns errors", () => {
    beforeEach(() => {
      (verify as any).mockImplementation(() => {
        return [new Error("error message 1"), new Error("error message 2")];
      });
    });

    it("should throw error", () => {
      expect(() => parse(stateFile)).toThrow();
    });

    it("should include verify error messages in thrown error", () => {
      try {
        parse(stateFile);
      } catch (e) {
        expect(e.message).toEqual(
          `There were some issues with the state file: error message 1, error message 2`
        );
      }
    });
  });

  describe("when verify returns no errors", () => {
    beforeEach(() => {
      (verify as any).mockImplementation(() => {
        return [];
      });
    });

    it("should not throw error", () => {
      expect(() => parse(stateFile)).not.toThrow();
    });
  });
});
