import React, { useEffect } from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data: object,
    schema: string[],
    setSchema: any
  };

const Board: React.FC<ChildProps> = ({
    data,
    schema,
    setSchema
}) => {
    useEffect(() => {
        if(data !== undefined){
            let height = document.querySelector(".board").clientHeight * 0.8
            document.getElementById("drop-board").style.minHeight = `${height}px`
            document.getElementById("drop-board").style.padding = `10px`
        }
      }, [data])
  
    let temp, ind;

    function entry(e){
        temp = schema.slice()
        if(!temp.includes(e.target.textContent)){
            temp.push(e.target.textContent)
        } else {
            ind = temp.indexOf(e.target.textContent)
            temp = temp.slice(0, ind).concat(temp.slice(ind + 1))
        }
        setSchema(temp)
        if(document.getElementById(e.target.id).style.backgroundColor === "orange"){
            document.getElementById(e.target.id).style.backgroundColor = "#00b4cca9"
        } else {
            document.getElementById(e.target.id).style.backgroundColor = "orange"
        }
    }

    return (
        <div className="board">
            <div className="schema-board"></div>
            {data !== undefined && <button className="schema" id="0" onClick={entry}>Query</button>}
            {data !== undefined && <button className="schema" id="1" onClick={entry}>Mutation</button>}
            <div className="drop-board" id="drop-board"></div>
        </div>
    )
}

export default Board;