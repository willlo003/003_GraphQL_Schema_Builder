import React, { useEffect } from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data: object,
    schema: string[],
    dragStart1: any,
    dragOver: any,
    dragEnter: any,
    dragLeave: any,
    drop: any,

  };

const Board: React.FC<ChildProps> = ({
    data,
    schema,
    dragStart1,
    dragOver,
    dragEnter,
    dragLeave,
    drop,
}) => {
    useEffect(() => {
        
        if(data !== undefined){
            let height = document.querySelector(".board").clientHeight 
            const queryBoard = document.getElementById("drop-board-0")
            const mutationBoard = document.getElementById("drop-board-1")

            queryBoard.style.minHeight = `${height/2}px`
            queryBoard.style.padding = `10px`
            let querryBackground = document.createElement('div')
            querryBackground.textContent = "Query"
            querryBackground.className = "querryBackground"
            queryBoard.append(querryBackground)
            queryBoard.addEventListener("dragover", dragOver)
            queryBoard.addEventListener("dragenter", dragEnter)
            queryBoard.addEventListener("dragleave", dragLeave)
            queryBoard.addEventListener("drop", drop)

            mutationBoard.style.minHeight = `${height/2}px`
            mutationBoard.style.padding = `10px`
            let mutationBackground = document.createElement('div')
            mutationBackground.textContent = "Mutation"
            mutationBackground.className = "mutationBackground"
            mutationBoard.append(mutationBackground)
            mutationBoard.addEventListener("dragover", dragOver)
            mutationBoard.addEventListener("dragenter", dragEnter)
            mutationBoard.addEventListener("dragleave", dragLeave)
            mutationBoard.addEventListener("drop", drop)

            const tool = document.getElementById("toolBoard")
            let type = document.createElement('button')
            type.textContent = "Type"
            type.draggable = true;
            type.cloneNode(true);
            tool.append(type)
            type.addEventListener("dragstart", dragStart1)
        }
      }, [data])

    return (
        <div className="board">
            {/* {data !== undefined && <button className="schema" id="0">Query</button>} */}
            {/* {data !== undefined && <button className="schema" id="1">Mutation</button>} */}
            <div className="toolBoard" id="toolBoard">
                {/* {data !== undefined && <button className="type" id="type">Type</button>} */}
            </div>
            <div className="Query" id="drop-board-0"></div>
            <div className="Mutation" id="drop-board-1"></div>
        </div>
    )
}

export default Board;