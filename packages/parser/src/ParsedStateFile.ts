import StateFile from "./types/StateFile";
import Settings from "./types/Settings";
import Workspace from "./types/Workspace";
import Collection from "./types/Collection";
import RequestDefinition from "./types/RequestDefinition";

export default class ParsedStateFile implements StateFile {
  constructor(
    public readonly filePath: string,
    public readonly _id: string,
    public readonly workspaces: Record<string, Workspace>,
    public readonly collections: Record<string, Collection>,
    public readonly requests: Record<string, RequestDefinition>,
    public readonly environment?: Record<string, string>,
    public readonly settings?: Settings
  ) {}

  getWorkspaces() {
    return Object.values(this.workspaces);
  }

  getWorkspaceCollections(workspace: Workspace) {
    return Object.values(this.collections).filter(
      collection => collection._parentId === workspace._id
    );
  }

  getCollectionRequests(collection: Collection) {
    return Object.values(this.requests).filter(
      request => request._parentId === collection._id
    );
  }
}
