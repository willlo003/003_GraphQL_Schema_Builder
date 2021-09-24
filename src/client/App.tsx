import React from "react";
import Api from "./components/Api";
import Data from "./components/Data";
import Code from "./components/Code";
import QueryBoard from "./components/QueryBoard";
import MutationBoard from "./components/MutationBoard";
import Tools from "./components/Tools";
import { useState, useEffect, useRef, useCallback } from "react";

const App: React.FC = () => {
  const [data, setData] = React.useState<object>({});
  const [dataKeys, setDataKeys] = React.useState<string[]>([]);
  const link = React.useRef<string>("");
  const [datatIdCount, setDataIdCount] = React.useState<number>(0);

  // useEffect(() => {
  //   console.log("why me?");
  //   setDataKeys(Object.keys(data));
  // }, [data]);

  const fetchingData = useCallback(
    (e) => {
      setData(e);
      setDataKeys(Object.keys(e));
    },
    [dataKeys]
  );

  // const updateDataId = useCallback(
  //   (e) => {
  //     setDataIdCount(e + 1);
  //   },
  //   [datatIdCount]
  // );

  console.log("App rendering");

  return (
    <div id="app">
      <h1>BuildQL</h1>
      <Api link={link.current} setData={setData} hanldeClick={fetchingData} />
      {dataKeys.length !== 0 && <Tools />}
      {dataKeys.length !== 0 && (
        <div className="content">
          <div className="data-list">
            {dataKeys.map((dataKey) => (
              <Data
                data={data}
                dataKey={dataKey}
                datatIdCount={datatIdCount}
                id={dataKeys.indexOf(dataKey)}
              />
            ))}
          </div>
          <div className="board">
            <QueryBoard data={data} />
            <MutationBoard data={data} />
          </div>
          <Code data={data} />
        </div>
      )}
    </div>
  );
};

export default App;
