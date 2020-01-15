export default interface Workspace {
  _id: string;
  name: string;
  description?: string;
  environment?: Record<string, string>;
}
