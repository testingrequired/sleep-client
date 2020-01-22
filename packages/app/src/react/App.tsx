import React from "react";
import { APP_INFO } from "../shared/constants";
import "./App.css";

const { ipcRenderer } = window as any;

const App: React.FC = () => {
  const [appName, setAppName] = React.useState<string>();
  const [appVersion, setAppVersion] = React.useState<string>();

  ipcRenderer.send(APP_INFO);

  ipcRenderer.on(APP_INFO, (event: any, arg: any) => {
    ipcRenderer.removeAllListeners(APP_INFO);

    setAppName(arg.appName);
    setAppVersion(arg.appVersion);
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {appName} version {appVersion}
        </p>
      </header>
    </div>
  );
};

export default App;
