export default interface RequestDefinition {
  _id: string;
  _parentId: string;
  name: string;
  description?: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  redirect?: "follow" | "error" | "manual";
  body?: string;
  environment?: Record<string, string>;
}
