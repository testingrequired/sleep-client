import parse from "./parse";
import verify from "./verify";
import makeTestStateFile from "./makeTestStateFile";

jest.mock("util", () => {
  return {
    promisify(fn: Function) {
      return (path: string, enc: string) => {
        const stateFileId = "stateFileId";
        const workspaceId = "workspaceId";
        const collectionId = "collectionId";
        const requestId = "requestId";
        const stateFile = makeTestStateFile(
          stateFileId,
          workspaceId,
          collectionId,
          requestId
        );

        return JSON.stringify(stateFile);
      };
    }
  };
});
jest.mock("./verify");
jest.mock("./mapStateFileToParsed");

describe("parse", () => {
  describe("when verify returns errors", () => {
    beforeEach(() => {
      (verify as any).mockImplementation(() => {
        return [new Error("error message 1"), new Error("error message 2")];
      });
    });

    it("should throw error", async () => {
      try {
        await parse("");
        fail("Did not throw error");
      } catch (e) {}
    });

    it("should include verify error messages in thrown error", async () => {
      try {
        await parse("");
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

    it("should not throw error", async () => {
      try {
        await parse("");
      } catch (e) {
        fail("Did throw error");
      }
    });
  });
});
