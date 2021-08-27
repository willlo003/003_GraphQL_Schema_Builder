import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/items";
import { useBetween } from "use-between";
import useShareableState from "../states/states";
import Line from "./Line";
type ChildProps = {
  data: object;
};

const MutationBoard: React.FC<ChildProps> = ({ data }) => {
  const {
    rootQueries,
    rootMutations,
    setRootMutations,
    typeMutations,
    setTypeMutations,
    tempPair,
    setTempPair,
    connectedPair,
    setConnectedPair,
    relaventContent,
    setRelaventContent,
    matched,
    setMatched,
    updateCode,
    setUpdateCode,
  } = useBetween(useShareableState);

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
      (currentTempPair[0][1] === "d" && e.target.id[1] === "r")
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
      if (currentTempPair[0][1] === "r" && currentTempPair[1][1] === "t") {
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
  function droppingTypeToMutation(item: any, monitor: any) {
    let tempArray: object[] = typeMutations;
    tempArray.push({ id: item.id, key: item.id });
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setTypeMutations(tempArray);
  }

  function droppingRootToMutation(item: any, monitor: any) {
    let tempArray: object[] = rootMutations;
    tempArray.push({ id: item.id, key: item.id });
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setRootMutations(tempArray);
  }

  // useDrop when dropping the cards
  const [{}, dropToRootMutationBoard]: any = useDrop({
    accept: ItemTypes.ROOT,
    drop: (item, monitor) => droppingRootToMutation(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{}, dropToTypeMutationBoard]: any = useDrop({
    accept: ItemTypes.TYPE,
    drop: (item, monitor) => droppingTypeToMutation(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function rootChange(e) {
    let cardId = e.target.parentElement.id;
    let rootCurrentText = relaventContent[cardId];

    //update rootMutations
    let tempRootMutations = rootMutations;
    tempRootMutations.forEach((tempRootMutation) => {
      if (tempRootMutation["id"] === cardId) {
        tempRootMutation["key"] = e.target.value;
      }
    });
    setRootMutations(tempRootMutations);

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
    let cardId = e.target.parentElement.id;
    let typeCurrentText = relaventContent[cardId];

    //update typeMutations
    let tempTypeMutations = typeMutations;
    tempTypeMutations.forEach((tempTypeMutation) => {
      if (tempTypeMutation["id"] === cardId) {
        tempTypeMutation["key"] = e.target.value;
      }
    });
    setTypeMutations(tempTypeMutations);

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
    setMatched(tempMatched);

    //update the code
    setUpdateCode(!updateCode);
  }

  return (
    <div className="mutation-board" id="mutation-board">
      <div
        className="mutation-root"
        id="mutation-root"
        ref={dropToRootMutationBoard}
      >
        {rootMutations.map((rootMutation: any) => (
          <div className="dropped-root" id={rootMutation.id}>
            <input
              className="rootInput"
              defaultValue={rootMutation.key}
              onChange={rootChange}
            ></input>
            <button
              className="right"
              onClick={lineUp}
              id={`r${rootMutation.id}`}
            ></button>
          </div>
        ))}
      </div>
      <div
        className="mutation-type"
        id="mutation-type"
        // style={{ background }}
        ref={dropToTypeMutationBoard}
      >
        {typeMutations.map((typeMutation: any) => (
          <div className="dropped-type" id={typeMutation.id}>
            <button
              className="left"
              id={`l${typeMutation.id}`}
              onClick={lineUp}
            ></button>
            <input
              className="typeInput"
              defaultValue={typeMutation.key}
              onChange={typeChange}
            ></input>
            <button
              className="right"
              id={`r${typeMutation.id}`}
              onClick={lineUp}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutationBoard;
