import mockAxios from "jest-mock-axios";
import { RequestDefinition } from "@sleep-client/parser";
import { callRequest, RequestCall, ResponseDefinition } from "./index";

describe("caller", () => {
  const expectedUrl = "expectedUrl";
  const expectedMethod = "expectedMethod";
  const expectedBody = { foo: "bar" };
  const expectedHeaders = { fizz: "buzz" };
  const expectedStatus = 201;
  const expectedStatusText = "Created";

  let requestDefinition: RequestDefinition;
  let requestCall: RequestCall;

  beforeEach(() => {
    requestDefinition = {
      _id: "",
      _parentId: "",
      name: "",
      url: expectedUrl,
      method: expectedMethod,
      body: JSON.stringify(expectedBody),
      headers: expectedHeaders
    };

    requestCall = callRequest(requestDefinition);

    mockAxios.mockResponse({
      data: expectedBody,
      headers: expectedHeaders,
      status: expectedStatus,
      statusText: expectedStatusText
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should pass request information", () => {
    expect(mockAxios).toBeCalledWith({
      url: expectedUrl,
      method: expectedMethod,
      data: {
        foo: "bar"
      },
      headers: {
        fizz: "buzz"
      }
    });
  });

  describe("request", () => {
    it("should be request definition", () => {
      expect(requestCall.request).toBe(requestDefinition);
    });
  });

  describe("response", () => {
    let response: ResponseDefinition;

    beforeEach(async () => {
      response = await requestCall.response;
    });

    it("should return response body", async () => {
      expect(response.body).toBe(JSON.stringify(expectedBody));
    });

    it("should return response headers", async () => {
      expect(response.headers).toBe(expectedHeaders);
    });

    it("should return response status", async () => {
      expect(response.status).toBe(expectedStatus);
    });

    it("should return response statusText", async () => {
      expect(response.statusText).toBe(expectedStatusText);
    });
  });
});
