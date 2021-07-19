import React, { useEffect } from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data: object,
    setEntryPoint: any, 
    schema: string[],
    setSchema: any
  };

const Board: React.FC<ChildProps> = ({
    data,
    setEntryPoint,
    schema,
    setSchema
}) => {

  
    let temp, ind;

    function entry(e){
        temp = schema.slice()
        // console.log(temp.includes(e.target.textContent))
        if(!temp.includes(e.target.textContent)){
            temp.push(e.target.textContent)
        } else {
            ind = temp.indexOf(e.target.textContent)
            temp = temp.slice(0, ind).concat(temp.slice(ind + 1))
        }
        setSchema(temp)
    }

    return (
        <div className="board">
            {data !== undefined && <button className="entry-point" id="0" onClick={entry}>Query</button>}
            {data !== undefined && <button className="entry-point" id="1" onClick={entry}>Mutation</button>}
            {/* {data !== undefined && <hr></hr>} */}
        </div>
    )
}

export default Board;