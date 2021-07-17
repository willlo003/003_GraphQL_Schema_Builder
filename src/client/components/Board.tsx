import React, {useState} from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data?:(val: object) => void,
    setEntryPoint?:(val: undefined) => void,
    style?:(val: object) => object,
    setStyle?:(val: object) => void
  };

const Board: React.FC<ChildProps> = ({
    data,
    setEntryPoint,
}) => {

    function entry(e){
        setEntryPoint(e.target.textContent)
        for (let i:number = 0; i < 2; i++){
            if (`${i}` === e.target.id){
                document.getElementById(`${i}`).style.backgroundColor = "orange"
            } else {
                document.getElementById(`${i}`).style.backgroundColor = "#00b4cca9"
            }
        }
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