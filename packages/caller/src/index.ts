import axios, { AxiosRequestConfig } from "axios";
import { RequestDefinition } from "@sleep-client/parser";

export function callRequest(request: RequestDefinition): RequestCall {
  const config: AxiosRequestConfig = {};

  config.url = request.url;
  config.method = request.method as any;

  if (request.body) {
    config.data = JSON.parse(request.body);
  }

  if (request.headers) {
    config.headers = request.headers;
  }

  const response = axios(config).then(response => {
    return {
      body: JSON.stringify(response.data),
      headers: response.headers,
      status: response.status,
      statusText: response.statusText
    };
  });

  return { request, response };
}

export interface RequestCall {
  request: RequestDefinition;
  response: Promise<ResponseDefinition>;
}

export interface ResponseDefinition {
  headers: Record<string, string>;
  body: string;
  status: number;
  statusText: string;
}
