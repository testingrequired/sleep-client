interface RestFile {
  name: string;
  request: RestFileRequest;
}

interface RestFileRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  redirect?: Redirect;
}

type Redirect = "follow" | "error" | "manual";
