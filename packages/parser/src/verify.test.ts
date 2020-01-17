import StateFile from "./types/StateFile";
import verify from "./verify";
import Workspace from "./types/Workspace";
import makeTestStateFile from "./makeTestStateFile";

describe("verify", () => {
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

  it("should not error with happy path", () => {
    expect(() => verify(stateFile)).not.toThrow();
  });

  describe("state file", () => {
    it("should error if _id is not defined", () => {
      delete stateFile._id;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        "stateFile._id must be defined as a string"
      );
    });

    describe("workspaces", () => {
      it("should error if not defined", () => {
        delete stateFile.workspaces;

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.workspaces must be defined as an object"
        );
      });

      it("should error if defined as non object", () => {
        (stateFile.workspaces as any) = "workspaces";

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.workspaces must be defined as an object"
        );
      });
    });

    describe("collections", () => {
      it("should error if not defined", () => {
        delete stateFile.collections;

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.collections must be defined as an object"
        );
      });

      it("should error if defined as non object", () => {
        (stateFile.collections as any) = "collections";

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.collections must be defined as an object"
        );
      });
    });

    describe("requests", () => {
      it("should error if not defined", () => {
        delete stateFile.requests;

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.requests must be defined as an object"
        );
      });

      it("should error if defined as non object", () => {
        (stateFile.requests as any) = "requests";

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.requests must be defined as an object"
        );
      });
    });

    describe("environment", () => {
      it("should not error if not defined", () => {
        delete stateFile.environment;

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.environment must be defined as an object"
        );
      });

      it("should error if defined as non object", () => {
        (stateFile.environment as any) = "environment";

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.environment must be defined as an object"
        );
      });
    });

    describe("settings", () => {
      it("should not error if settings is not defined", () => {
        delete stateFile.settings;

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.settings must be defined as an object"
        );
      });

      it("should error if defined as non object", () => {
        (stateFile.settings as any) = "settings";

        const errors = verify(stateFile);

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe(
          "stateFile.settings must be defined as an object"
        );
      });
    });
  });

  describe("workspace", () => {
    let workspace: Workspace;

    beforeEach(() => {
      workspace = stateFile.workspaces[workspaceId];
    });

    it("should error if _id is not defined", () => {
      delete workspace._id;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}]._id must be defined as a string`
      );
    });

    it("should error if _id doesn't match workspaces key", () => {
      const expectedWorkspaceId = "differentWorkspaceId";

      stateFile.workspaces[workspaceId] = {
        _id: expectedWorkspaceId,
        name: "workspace name",
        environment: {}
      };

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}]._id must does not match workspace key: ${expectedWorkspaceId}`
      );
    });

    it("should error if name is not defined", () => {
      delete workspace.name;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}].name must be defined as a string`
      );
    });

    it("should error if name is defined as non string", () => {
      (workspace.name as any) = 123;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}].name must be defined as a string`
      );
    });

    it("should not error if description is not defined", () => {
      delete workspace.description;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(0);
    });

    it("should error if description is defined as non string", () => {
      (workspace.description as any) = 123;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}].description must be defined as a string`
      );
    });

    it("should not error if environment is not defined", () => {
      delete workspace.environment;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(0);
    });

    it("should error if environment is defined as non object", () => {
      (workspace.environment as any) = 123;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}].environment must be defined as an object`
      );
    });

    it("should error if environment has non string value", () => {
      (workspace.environment as any).key = 123;

      const errors = verify(stateFile);

      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe(
        `stateFile.workspaces[${workspaceId}].environment[key] has non string value: 123`
      );
    });
  });

  describe("collection", () => {
    it.todo("should error if _id is not defined");

    it.todo("should error if _parentId is not defined");
    it.todo("should error when collection references non workspace parent id");
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
