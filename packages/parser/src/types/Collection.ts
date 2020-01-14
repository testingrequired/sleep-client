import RequestDefinition from "./RequestDefinition";

export default interface Collection {
  _id: string;
  name: string;
  description?: string;
  requests: Record<string, RequestDefinition>;
  environment?: Record<string, string>;
}
