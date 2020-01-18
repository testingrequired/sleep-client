# @sleep-client/parser

Library for parsing sleep client state files.

## Installation

```bash
$ npm i @sleep-client/parser
```

## Usage

```javascript
import {
  parse,
  ParsedStateFile,
  mapParsedToExport
} from "@sleep-client/parser";

(await () => {
  try {
    const parsedStateFile: ParsedStateFile = await parse("./path/to/stateFile");

    const workspaces = parsedStateFile.getWorkspaces();
    const collections = parsedStateFile.getWorkspaceCollections(workspaces[0]);
    const requests = parsedStateFile.getCollectionRequests(collections[0]);

    const stateFileJson = JSON.stringify(mapParsedToExport(parsedStateFile));
  } catch(e){
    e.message // Contains any errors parsing
  }
})()
```
