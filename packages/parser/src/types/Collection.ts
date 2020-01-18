export default interface Collection {
  _id: string;
  _parentId: string;
  name: string;
  description?: string;
  environment?: Record<string, string>;
}
