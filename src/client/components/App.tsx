import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";

const App: React.FC = () => {

    const [link, setLink] = React.useState();
    const [data, setData] = React.useState();
    const [entryPoint, setEntryPoint] = React.useState();



    return (
        <div>
            <Api link={link} setLink={setLink} setData={setData}/>
            <div className="content">
               <Data data={data} />
               <Board data={data} setEntryPoint={setEntryPoint} />
               <Code entryPoint={entryPoint}/>
            </div>
        </div>
    )
}

export default App;