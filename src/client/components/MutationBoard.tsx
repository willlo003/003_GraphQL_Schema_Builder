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
    rootMutationCards,
    setRootMutationCards,
    typeMutationCards,
    setTypeMutationCards,
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
    // console.log("connectedPair", connectedPair);
  }

  // function when dropping data card to query

  function droppingTypeToMutation(item: any, monitor: any) {
    let tempArray: string[] = typeMutations;
    tempArray.push(item.id);
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setTypeMutations(tempArray);
    let tempContent = typeMutationCards;
    tempContent.push(item.id.toString());
    setTypeMutationCards(tempContent);
  }

  function droppingRootToMutation(item: any, monitor: any) {
    let tempArray: string[] = rootMutations;
    tempArray.push(item.id);
    let tempRelaventContent: any = relaventContent;
    tempRelaventContent[item.id] = item.id;
    setRelaventContent(tempRelaventContent);
    setRootMutations(tempArray);
    let tempContent = rootMutationCards;
    tempContent.push(item.id.toString());
    setRootMutationCards(tempContent);
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
    let rootMutationCardsId = rootMutationCards.indexOf(e.target.defaultValue);
    if (rootMutationCardsId === -1) {
      rootMutationCardsId = rootMutationCards.indexOf(e.target.value);
    }
    console.log(e.target.value, e.target.defaultValue);
    console.log(
      // "rootQueries",
      // rootQueries,
      "rootMutations",
      rootMutations,
      "relaventContent",
      relaventContent,
      "matched",
      matched,
      // "rootQueryCards",
      // rootQueryCards,
      "rootMutationCards",
      rootMutationCards
    );
  }

  return (
    <div className="mutation-board" id="mutation-board">
      <div className="query-root" id="query-root" ref={dropToRootMutationBoard}>
        {rootMutations.map((rootMutation: any) => (
          <div className="dropped-root" id={rootMutation}>
            <input
              className="rootInput"
              defaultValue={rootMutation}
              onChange={rootChange}
            ></input>
            <button
              className="right"
              onClick={lineUp}
              id={`r${rootMutation}`}
            ></button>
          </div>
        ))}
      </div>
      <div
        className="query-type"
        id="query-type"
        // style={{ background }}
        ref={dropToTypeMutationBoard}
      >
        {typeMutations.map((typeMutation: any) => (
          <div className="dropped-type" id={typeMutation}>
            <button
              className="left"
              id={`l${typeMutation}`}
              onClick={lineUp}
            ></button>
            <input className="typeInput" defaultValue={typeMutation}></input>
            <button
              className="right"
              id={`r${typeMutation}`}
              onClick={lineUp}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutationBoard;
