import React, { useEffect } from "react";
import { useState } from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data: object,
    schema: string[],
    dragOver: any,
    dragEnter: any,
    dragLeave: any,
    drop: any,

  };

const Board: React.FC<ChildProps> = ({
    data,
    schema,
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
        }
      }, [data])
  
    // let temp, ind;

    // function entry(){
        // console.log(document.getElementById('drop-board-0').children)
    //     temp = schema.slice()
    //     if(!temp.includes(e.target.textContent)){
    //         temp.push(e.target.textContent)
    //     } else {
    //         ind = temp.indexOf(e.target.textContent)
    //         temp = temp.slice(0, ind).concat(temp.slice(ind + 1))
    //     }
        // setSchema(temp)
        // if(document.getElementById(e.target.id).style.backgroundColor === "orange"){
            // document.getElementById(e.target.id).style.backgroundColor = "#00b4cca9";
            // document.getElementById(`drop-board-${e.target.id}`).style.display = "none"
        // } else {
            // document.getElementById(e.target.id).style.backgroundColor = "orange";
            // document.getElementById(`drop-board-${e.target.id}`).style.display = "block"
            // document.getElementById(`drop-board-${e.target.id}`).textContent = e.target.textContent
        // }
    // }

    return (
        <div className="board">
            <div className="schema-board"></div>
            {/* {data !== undefined && <button className="schema" id="0">Query</button>} */}
            {/* {data !== undefined && <button className="schema" id="1">Mutation</button>} */}
            <div className="Query" id="drop-board-0"></div>
            <div className="Mutation" id="drop-board-1"></div>
        </div>
    )
}

export default Board;