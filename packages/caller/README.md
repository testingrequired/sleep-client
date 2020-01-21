# @sleep-client/caller

## Installation

```bash
$ npm i @sleep-client/caller
```

## Usage

```javascript
import assert from "assert";
import { parse } from "@sleep-client/parser";
import { callRequest } from "@sleep-client/caller";

(await () => {
  try {
    const parsedStateFile = await parse("./path/to/stateFile");

    const workspaces = parsedStateFile.getWorkspaces();
    const collections = parsedStateFile.getWorkspaceCollections(workspaces[0]);
    const [request] = parsedStateFile.getCollectionRequests(collections[0]);

    const call = callRequest(request);

    assert.strictEqual(call.request, request);

    const response = await call.response;

    assert.strictEqual(200, response.status);
  } catch(e){
    e.message // Contains any errors parsing
  }
})()
```
