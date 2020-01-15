import Workspace from "./Workspace";
import Settings from "./Settings";
import Collection from "./Collection";
import RequestDefinition from "./RequestDefinition";

export default interface StateFile {
  _id: string;
  environment?: Record<string, string>;
  settings?: Settings;
  workspaces: Record<string, Workspace>;
  collections: Record<string, Collection>;
  requests: Record<string, RequestDefinition>;
}
