import { AnyARecord } from "dns";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/items";

type ChildProps = {
  // onClick?:(val: string) => void,
  data: object;
  // schema: string[],
  // dragStart1: any,
  // dragOver: any,
  // dragEnter: any,
  // dragLeave: any,
  // drop: any,
};

const Board: React.FC<ChildProps> = ({
  data,
  // schema,
  // dragStart1,
  // dragOver,
  // dragEnter,
  // dragLeave,
  // drop,
}) => {
  const [leftCount, setLeftCount] = React.useState<number>(0);
  const [rightCount, setRightCount] = React.useState<number>(0);

  useEffect(() => {
    // if(data !== undefined){
    //     let height = document.querySelector(".board").clientHeight
    //     const queryBoard = document.getElementById("drop-board-0")
    //     const mutationBoard = document.getElementById("drop-board-1")
    //     queryBoard.addEventListener("dragover", dragOver)
    //     queryBoard.addEventListener("dragenter", dragEnter)
    //     queryBoard.addEventListener("dragleave", dragLeave)
    //     queryBoard.addEventListener("drop", drop)
    //     mutationBoard.addEventListener("dragover", dragOver)
    //     mutationBoard.addEventListener("dragenter", dragEnter)
    //     mutationBoard.addEventListener("dragleave", dragLeave)
    //     mutationBoard.addEventListener("drop", drop)
    //     const tool = document.getElementById("toolBoard")
    //     const type = document.createElement('div')
    //     const typeInput = document.createElement('input')
    //     typeInput.className = 'typeInput';
    //     typeInput.value = "Type";
    //     // type.textContent = "Type"
    //     type.className = "type";
    //     type.draggable = true;
    //     type.cloneNode(true);
    //     type.append(typeInput)
    //     tool.append(type)
    //     type.addEventListener("dragstart", dragStart1)
    //     const root = document.createElement('div')
    //     const rootInput = document.createElement('input')
    //     rootInput.className = 'rootInput';
    //     rootInput.value = "Root";
    //     // root.textContent = "Name?"
    //     root.className = "root";
    //     root.draggable = true;
    //     root.cloneNode(true);
    //     tool.append(root)
    //     root.append(rootInput)
    //     root.addEventListener("dragstart", dragStart1)
    // }
  }, [data]);

  function drappingCard(item: any, monitor: any) {
    let queryBoard: any = document.getElementById("query-board");
    // const dragItem: any = document.getElementById(item.id);
    console.log(item);
    // let keyCard = card.dragItem.cloneNode(true);
    // keyCard.className = "key";
    // queryBoard.append(dragItem);
    // keyCard.style.left = event.clientX + "px";
    // keyCard.style.top = 22 + "px";
  }

  // useDrop
  const [{ isOver }, dropToQuery]: any = useDrop({
    accept: ItemTypes.DATA,
    drop: (item, monitor) => drappingCard(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="board">
      <div className="tool-board" id="tool-board">
        <div className="type" draggable="true">
          <input className="typeInput" value="Type"></input>
        </div>
        <div className="root" draggable="true">
          <input className="rootInput" value="Root"></input>
        </div>
      </div>
      <div className="query-board" id="query-board" ref={dropToQuery}>
        Query
      </div>
      <div className="mutation-board" id="mutation-board">
        Mutation
      </div>
    </div>
  );
};

export default Board;
