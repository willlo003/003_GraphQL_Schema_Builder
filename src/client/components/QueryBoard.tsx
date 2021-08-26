import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/items";
import { useBetween } from "use-between";
import useShareableState from "../states/states";
import Line from "./Line";
type ChildProps = {
  data: object;
};

const QueryBoard: React.FC<ChildProps> = ({ data }) => {
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
    relaventContent,
    setRelaventContent,
    matched,
    setMatched,
    datatIdCount,
    setDataIdCount,
    updateCode,
    setUpdateCode,
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
      Line(x1, y1, x2, y2, lindId);
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
      e.target.style.background = "orange";
      setTempPair(currentTempPair);
    } else if (
      (currentTempPair[0][1] === "r" && e.target.id[1] === "d") ||
      (currentTempPair[0][1] === "d" && e.target.id[1] === "r") ||
      currentTempPair[0][0] === e.target.id[0]
    ) {
      alert("Wrong Connection");
    } else {
      //if temp pair have one id inside
      //also know the whether they can pair
      //root to type(L), type(R) to data
      currentTempPair.push(e.target.id);
      currentConnectedPair.push(currentTempPair);
      e.target.style.background = "orange";
      // set matched content
      let tempMatched: any = matched;
      let currentRelaventContent: any = relaventContent;
      let firstCardContent, secondCardContent;
      if (
        (currentTempPair[0][1] === "r" && currentTempPair[1][1] === "t") ||
        (currentTempPair[0][1] === "t" && currentTempPair[1][1] === "d")
      ) {
        firstCardContent = currentRelaventContent[currentTempPair[0].slice(1)];
        secondCardContent = currentRelaventContent[currentTempPair[1].slice(1)];
      } else {
        secondCardContent = currentRelaventContent[currentTempPair[0].slice(1)];
        firstCardContent = currentRelaventContent[currentTempPair[1].slice(1)];
      }
      if (tempMatched.hasOwnProperty(firstCardContent)) {
        tempMatched[firstCardContent].push(secondCardContent);
      } else {
        tempMatched[firstCardContent] = [secondCardContent];
      }
      setMatched(tempMatched);
      setConnectedPair(currentConnectedPair);
      setTempPair([]);
    }
  }

  // function when dropping data card to query
  function droppingDataToQuery(item: any, monitor: any) {
    let tempArray: object[] = dataQueries;
    tempArray.push({ id: item.id, key: item.key });
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.key;
    setRelaventContent(tempRelaventContent);
    setDataQueries(tempArray);
    setDataIdCount(datatIdCount + 1);
  }

  function droppingTypeToQuery(item: any, monitor: any) {
    let tempArray: object[] = typeQueries;
    tempArray.push({ id: item.id, key: item.id });
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setTypeQueries(tempArray);
  }

  function droppingRootToQuery(item: any, monitor: any) {
    let tempArray: object[] = rootQueries;
    tempArray.push({ id: item.id, key: item.id });
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setRootQueries(tempArray);
  }

  // useDrop when dropping the cards
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

  function rootChange(e) {
    let cardId = e.target.parentElement.id;
    let rootCurrentText = relaventContent[cardId];

    //update rootQueries
    let tempRootQueries = rootQueries;
    tempRootQueries.forEach((tempRootQuery) => {
      if (tempRootQuery["id"] === cardId) {
        tempRootQuery["key"] = e.target.value;
      }
    });
    setRootQueries(tempRootQueries);

    //update relaventContent
    let tempRelaventContent = relaventContent;
    tempRelaventContent[cardId] = e.target.value;
    setRelaventContent(tempRelaventContent);

    //update matched
    let tempMatched = matched;
    tempMatched[e.target.value] = tempMatched[rootCurrentText];
    delete tempMatched[rootCurrentText];
    setMatched(tempMatched);

    //update the code
    setUpdateCode(!updateCode);
  }

  function typeChange(e) {
    console.log(matched);
    let cardId = e.target.parentElement.id;
    let typeCurrentText = relaventContent[cardId];

    //update typeQueries
    let tempTypeQueries = typeQueries;
    tempTypeQueries.forEach((tempTypeQuery) => {
      if (tempTypeQuery["id"] === cardId) {
        tempTypeQuery["key"] = e.target.value;
      }
    });
    setTypeQueries(tempTypeQueries);

    // update relaventContent
    let tempRelaventContent = relaventContent;
    tempRelaventContent[cardId] = e.target.value;
    setRelaventContent(tempRelaventContent);

    //update matched
    let tempMatched = matched;
    for (let pair in tempMatched) {
      tempMatched[pair].forEach((el) => {
        if (el === typeCurrentText) {
          let ind = tempMatched[pair].indexOf(typeCurrentText);
          tempMatched[pair][ind] = e.target.value;
        }
      });
    }

    tempMatched = matched;
    tempMatched[e.target.value] = tempMatched[typeCurrentText];
    delete tempMatched[typeCurrentText];
    setMatched(tempMatched);

    //update the code
    setUpdateCode(!updateCode);
  }

  return (
    <div className="query-board" id="query-board">
      <div className="query-root" id="query-root" ref={dropToRootQueryBoard}>
        {rootQueries.map((rootQuery: any) => (
          <div className="dropped-root" id={rootQuery.id}>
            <input
              className="rootInput"
              defaultValue={rootQuery.key}
              onChange={rootChange}
            ></input>
            <button
              className="right"
              onClick={lineUp}
              id={`r${rootQuery.id}`}
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
          <div className="dropped-type" id={typeQuery.id}>
            <button
              className="left"
              id={`l${typeQuery.id}`}
              onClick={lineUp}
            ></button>
            <input
              className="typeInput"
              defaultValue={typeQuery.key}
              onChange={typeChange}
            ></input>
            <button
              className="right"
              id={`r${typeQuery.id}`}
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
  );
};

export default QueryBoard;
