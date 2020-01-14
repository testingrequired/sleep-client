import Workspace from "./Workspace";
import Settings from "./Settings";

export default interface StateFile {
  workspaces: Record<string, Workspace>;
  environment: Record<string, string>;
  settings: Settings;
}
