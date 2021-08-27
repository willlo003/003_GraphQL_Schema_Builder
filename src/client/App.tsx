import React from "react";
import Api from "./components/Api";
import Data from "./components/Data";
import Code from "./components/Code";
import QueryBoard from "./components/QueryBoard";
import MutationBoard from "./components/MutationBoard";
import Tools from "./components/Tools";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [link, setLink] = React.useState<string>("");
  const [data, setData] = React.useState<object>({});
  const [dataKeys, setDataKeys] = React.useState<string[]>([]);

  useEffect(() => {
    setDataKeys(Object.keys(data));
  }, [data]);

  return (
    <div id="app">
      <h1>BuildQL</h1>
      <Api link={link} setLink={setLink} setData={setData} />
      {dataKeys.length !== 0 && <Tools />}

      <div className="content">
        {dataKeys.length !== 0 && (
          <div className="data-list">
            {dataKeys.map((dataKey) => (
              <Data
                data={data}
                dataKey={dataKey}
                id={dataKeys.indexOf(dataKey)}
              />
            ))}
          </div>
        )}
        {dataKeys.length !== 0 && (
          <div className="board">
            <QueryBoard data={data} />
            <MutationBoard data={data} />
          </div>
        )}
        {dataKeys.length !== 0 && <Code data={data} />}
      </div>
    </div>
  );
};

export default App;
