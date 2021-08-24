import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../dnd/items";

type ChildProps = {};

const Tools: React.FC<ChildProps> = ({}) => {
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

  return (
    <div className="tool-board" id="tool-board">
      <div className="type" ref={dragType}>
        <input className="typeInput" value="Type"></input>
      </div>
      <div className="root" ref={dragRoot}>
        <input className="rootInput" value="Root"></input>
      </div>
    </div>
  );
};

export default Tools;
