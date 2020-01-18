# @sleep-client/parser

Library for parsing sleep client state files.

## Installation

```bash
$ npm i @sleep-client/parser
```

## Usage

```typescript
import { parse, ParsedStateFile, Workspace, Collection, RequestDefinition, mapParsedStateFileToExported } from "@sleep-client/parser";

(await () => {
  try {
    const parsedStateFile: ParsedStateFile = await parse("./path/to/stateFile");

    const workspaces: Array<Workspace> = parsedStateFile.getWorkspaces();
    const collections: Array<Collection> = parsedStateFile.getWorkspaceCollections(workspaces[0]);
    const requests: Array<RequestDefinition> = parsedStateFile.getCollectionRequests(collections[0]);

    const stateFileJson = JSON.stringify(mapParsedStateFileToExported(parsedStateFile));
  } catch(e){
    e.message // Contains any errors parsing
  }
})()
```
