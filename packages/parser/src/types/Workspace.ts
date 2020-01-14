import Collection from "./Collection";

export default interface Workspace {
  _id: string;
  name: string;
  description?: string;
  collections: Record<string, Collection>;
  environment?: Record<string, string>;
}
