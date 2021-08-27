import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../dnd/items";
import { useBetween } from "use-between";
import useShareableState from "../states/states";

type ChildProps = {};

const Tools: React.FC<ChildProps> = ({}) => {
  const {
    setDataQueries,
    setRootQueries,
    setTypeQueries,
    setRootMutations,
    setTypeMutations,
    setTempPair,
    setConnectedPair,
    setRelaventContent,
    setMatched,
    setDataIdCount,
  } = useBetween(useShareableState);

  const [rootId, setRootId] = React.useState<number>(0);
  const [typeId, setTypeId] = React.useState<number>(0);

  const [{}, dragType] = useDrag({
    type: ItemTypes.TYPE,
    item: () => ({ id: `type${typeId}` }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      let tempId = typeId;
      setTypeId(tempId + 1);
    },
  });

  const [, dragRoot] = useDrag({
    type: ItemTypes.ROOT,
    item: () => ({ id: `root${rootId}` }),
    end: (item, monitor) => {
      let tempId = rootId;
      setRootId(tempId + 1);
    },
  });

  function cleanAll() {
    setDataQueries([]);
    setRootQueries([]);
    setTypeQueries([]);
    setRootMutations([]);
    setTypeMutations([]);
    setTempPair([]);
    setConnectedPair([]);
    setRelaventContent({});
    setMatched({});
    setDataIdCount(0);
    let lines: NodeListOf<Element> = document.querySelectorAll(".line");
    for (var element of lines) {
      element.remove();
    }
  }

  return (
    <div className="tool-board" id="tool-board">
      <div className="type" ref={dragType}>
        <input className="typeInput" value="Type"></input>
      </div>
      <div className="root" ref={dragRoot}>
        <input className="rootInput" value="Root"></input>
      </div>
      <button className="clean" onClick={cleanAll}>
        Clean All
      </button>
    </div>
  );
};

export default Tools;
