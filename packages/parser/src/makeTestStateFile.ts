import StateFile from "./types/StateFile";

export default function makeTestStateFile(
  stateFileId: string,
  workspaceId: string,
  collectionId: string,
  requestId: string
) {
  const stateFile: StateFile = {
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
  return stateFile;
}
