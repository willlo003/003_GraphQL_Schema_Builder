import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";
import { useEffect } from "react";

const App: React.FC = () => {

    const [link, setLink] = React.useState<string>('');
    const [data, setData] = React.useState<object>();
    const [schema, setSchema] = React.useState<string[]>([])

    return (
        <div>
            <Api link={link} setLink={setLink} setData={setData}/>
            <div className="content">
               <Data data={data} />
               <Board data={data} schema={schema} setSchema={setSchema}/>
               <Code data={data} schema={schema}/>
            </div>
        </div>
    )
}

export default App;