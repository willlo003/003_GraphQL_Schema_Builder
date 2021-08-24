import { AnyARecord } from "dns";
import { connect } from "http2";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/items";
import { useBetween } from "use-between";
import useShareableState from "../states/states";
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
  const {
    dataQueries,
    setDataQueries,
    rootQueries,
    setRootQueries,
    typeQueries,
    setTypeQueries,
    tempPair,
    setTempPair,
    connectedPair,
    setConnectedPair,
  } = useBetween(useShareableState);

  useEffect(() => {
    connectedPair.map((pair) => {
      let firstElement: any = document.getElementById(pair[0]);
      let secondElement: any = document.getElementById(pair[1]);
      let x1 = firstElement.getBoundingClientRect().x + 5;
      let y1 = firstElement.getBoundingClientRect().y + 5;
      let x2 = secondElement.getBoundingClientRect().x + 5;
      let y2 = secondElement.getBoundingClientRect().y + 5;
      if (x2 < x1) {
        var tmp;
        tmp = x2;
        x2 = x1;
        x1 = tmp;
        tmp = y2;
        y2 = y1;
        y1 = tmp;
      }
      // get the line a id depends on left node
      let lindId: string =
        pair[0][0] === "l" ? `line${pair[0]}` : `line${pair[1]}`;
      linedraw(x1, y1, x2, y2, lindId);
    });
  }, [connectedPair.length]);

  //   //when the card connect
  function lineUp(e: any) {
    // declare current pair
    let currentTempPair = tempPair;
    let currentConnectedPair = connectedPair;
    // if no temp pair
    if (currentTempPair.length === 0) {
      currentTempPair.push(e.target.id);
      setTempPair(currentTempPair);
    } else {
      //if temp pair have one id inside
      //also know the whether they can pair
      //root to type(L), type(R) to data
      if (
        (currentTempPair[0][1] !== "r" && e.target.id[1] !== "d") ||
        (currentTempPair[0][1] !== "d" && e.target.id[1] !== "r")
      ) {
        currentTempPair.push(e.target.id);
        currentConnectedPair.push(currentTempPair);
        setConnectedPair(currentConnectedPair);
        setTempPair([]);
      }
    }
    e.target.style.background = "orange";
    console.log("connectedPair", connectedPair);
  }

  // draw the line
  function linedraw(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    id: string
  ) {
    if (x2 < x1) {
      let tmp;
      tmp = x2;
      x2 = x1;
      x1 = tmp;
      tmp = y2;
      y2 = y1;
      y1 = tmp;
    }

    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const m = (y2 - y1) / (x2 - x1);
    const degree = (Math.atan(m) * 180) / Math.PI;

    const line = document.createElement("div");
    line.className = "line";
    line.id = id;
    line.style.transform = `rotate(${degree}deg)`;
    line.style.width = `${lineLength}px`;
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
    document.body.append(line);
  }

  // function when dropping data card to query
  function droppingDataToQuery(item: any, monitor: any) {
    let tempArray: object[] = dataQueries;
    tempArray.push({ id: item.id, key: item.key });
    setDataQueries(tempArray);
    console.log("dataQueries", dataQueries);
  }

  function droppingTypeToQuery(item: any, monitor: any) {
    let tempArray: string[] = typeQueries;
    tempArray.push(item.id);
    setTypeQueries(tempArray);
    console.log("typeQueries", typeQueries);
  }

  function droppingRootToQuery(item: any, monitor: any) {
    let tempArray: string[] = rootQueries;
    tempArray.push(item.id);
    setRootQueries(tempArray);
    console.log("rootQueries", rootQueries);
  }

  // useDrop

  // let isOver: any = false;

  const [{}, dropToDataQueryBoard]: any = useDrop({
    accept: ItemTypes.DATA,
    drop: (item, monitor) => droppingDataToQuery(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{}, dropToTypeQueryBoard]: any = useDrop({
    accept: ItemTypes.TYPE,
    drop: (item, monitor) => droppingTypeToQuery(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{}, dropToRootQueryBoard]: any = useDrop({
    accept: ItemTypes.ROOT,
    drop: (item, monitor) => droppingRootToQuery(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // change the background color when hovering
  // let background: string = "";
  // if (isOver) {
  //   background = "#8f8c8c";
  // }

  return (
    <div className="board">
      <div className="query-board" id="query-board">
        <div className="query-root" id="query-root" ref={dropToRootQueryBoard}>
          {rootQueries.map((rootQuery: any) => (
            <div className="dropped-root" id={rootQuery}>
              <input className="rootInput"></input>
              <button
                className="right"
                onClick={lineUp}
                id={`r${rootQuery}`}
              ></button>
            </div>
          ))}
        </div>
        <div
          className="query-type"
          id="query-type"
          // style={{ background }}
          ref={dropToTypeQueryBoard}
        >
          {typeQueries.map((typeQuery: any) => (
            <div className="dropped-type" id={typeQuery}>
              <button
                className="left"
                id={`l${typeQuery}`}
                onClick={lineUp}
              ></button>
              <input className="typeInput"></input>
              <button
                className="right"
                id={`r${typeQuery}`}
                onClick={lineUp}
              ></button>
            </div>
          ))}
        </div>
        <div
          className="query-data"
          id="query-data"
          // style={{ background }}
          ref={dropToDataQueryBoard}
        >
          {dataQueries.map((dataQuery: any) => (
            <button className="dropped-data" id={dataQuery.id}>
              <button
                className="left"
                id={`l${dataQuery.id}`}
                onClick={lineUp}
              ></button>
              {dataQuery.key}
            </button>
          ))}
        </div>
      </div>

      <div className="mutation-board" id="mutation-board">
        Mutation
      </div>
    </div>
  );
};

export default Board;
